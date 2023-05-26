import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer'
import { RoleMenuEntity } from '../entities/user/role-menu.entity'
import { MenuEntity } from '../entities/user/menu.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { GetAllUserDto } from './dto/get-allUser.dto'
import { ChangeUserStatusDto, UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from '../entities/user/user.entity'
import { UserRoleEntity } from '../entities/user/user-role.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
        @InjectRepository(UserRoleEntity) private readonly userRole: Repository<UserRoleEntity>,
        @InjectRepository(MenuEntity) private readonly menu: Repository<MenuEntity>,
        private readonly cryptoService: CryptoService
    ) {}

    // 根据userName查找用户 未删除且未停用
    async findByUsername(userName: string): Promise<UserEntity> {
        const res = await this.user.findOne({ where: { userName, status: '0', delFlag: '0' } })
        return res
    }

    // 查找所有用户
    async findAll(getAllUser: GetAllUserDto): Promise<Record<string, any>> {
        const { userName, nickName, page, limit } = getAllUser
        const rpage = page > 0 ? page : 0
        const [res, total] = await this.user.findAndCount({
            where: { userName: Like(`%${userName}%`), nickName: Like(`%${nickName}%`) },
            relations: ['userRoles'],
            skip: (rpage - 1) * limit,
            take: limit
        })
        return {
            list: instanceToPlain(res),
            total
        }
    }

    // 登录记录时间
    async loginDateById(userId: number) {
        await this.user.update({ userId }, { loginDate: new Date() })
    }

    // 获取用户信息
    async getInfo(userId: number): Promise<Record<string, any>> {
        // 用户信息 角色
        const user = await this.userRole.findOne({
            relations: ['user', 'role'],
            where: { userId }
        })

        delete user.roleId
        delete user.userId

        // 权限
        return instanceToPlain(user)
    }

    // 获取路由信息
    async getRouters(userId: number): Promise<Record<string, any>> {
        const routers = await this.menu
            .createQueryBuilder('menu')
            .leftJoinAndSelect(RoleMenuEntity, 'roleMenu', 'menu.menuId = roleMenu.menuId')
            .leftJoinAndSelect(UserRoleEntity, 'userRole', 'roleMenu.roleId = userRole.roleId')
            .where('userRole.userId= :userId', { userId })
            .andWhere('menu.status= 0')
            .select([
                'menu.menuId as menuId',
                'menu.parentId as parentId',
                'menu.path as path',
                'menu.menuName as name',
                'menu.alwaysShow as alwaysShow',
                'menu.component as component',
                'menu.redirect as redirect',
                'menu.icon as svgIcon',
                'menu.title as title'
            ])
            .orderBy('menu.parentId')
            .addOrderBy('menu.menuId')
            .getRawMany()

        return instanceToPlain(this.buildRouteTree(routers))
    }

    // 路由tree
    buildRouteTree(routes: any[], parentId = 0): any[] {
        const result: any[] = []
        for (const route of routes) {
            if (route.parentId === parentId) {
                const newRoute = {
                    path: route.path,
                    component: route.component,
                    name: route.name,
                    meta: {
                        title: route.title,
                        svgIcon: route.svgIcon
                        // orderNo: route.orderNo
                    }
                }
                if (!route.redirect) {
                    newRoute['name'] = route.name
                }
                // 目前只有标签为alwaysShow
                // 去除alwaysShow为false
                if (route.alwaysShow === 1) {
                    newRoute.meta['alwaysShow'] = true
                }
                // 去除null
                if (route.redirect) {
                    Object.assign(newRoute, { redirect: route.redirect })
                }
                const children = this.buildRouteTree(routes, route.menuId)
                if (children.length > 0) {
                    newRoute['children'] = children
                }
                result.push(newRoute)
            }
        }
        return result
    }

    // 创建用户
    async createUser(user: CreateUserDto): Promise<Record<string, any>> {
        const { role, ...userWithoutRole } = user
        // 查询是否存在用户
        const res = await this.user.findOne({ where: { userName: userWithoutRole.userName } })
        if (res) {
            throw new BadRequestException({ message: '用户已存在' })
        }
        try {
            // 密码加密，返回
            const { password, pwdSalt } = this.cryptoService.encryptPwd(userWithoutRole.password)

            // 保存加密密码到user
            // 此方法将普通javascript对象转换为特定类的实例。
            const newUser = plainToClass(
                UserEntity,
                Object.assign(userWithoutRole, { password, pwdSalt })
            )

            // 级联实体
            const userRole = this.userRole.create({ roleId: role })
            newUser.userRoles = [userRole]
            // 保存到数据库
            await this.user.save(newUser)

            return { message: '用户创建成功' }
        } catch (err) {
            throw new BadRequestException({ message: '用户创建失败' })
        }
    }

    // 更新用户数据
    async updateUser(id: number, user: UpdateUserDto) {
        const { userName, role: roleId, ...arg } = user
        const userRes = await this.user.findOne({
            where: { userId: id, userName }
        })
        if (!userRes) {
            throw new BadRequestException({ message: '该用户不存在' })
        }
        try {
            const role = await this.userRole.findOne({ where: { userId: id } })
            role.roleId = roleId

            const newUser = plainToInstance(UserEntity, Object.assign(userRes, arg))
            const newUserRole = plainToInstance(UserRoleEntity, role)
            await this.user.update({ userId: id }, newUser)
            await this.userRole.update({ userId: id }, newUserRole)
        } catch (error) {
            throw new BadRequestException('更新用户信息失败')
        }

        return { message: '更新用户信息成功' }
    }

    // 更改用户状态
    async changeUserStatus({ userId, status: s }: ChangeUserStatusDto) {
        const user = await this.user.findOne({ where: { userId } })
        if (!user) {
            throw new BadRequestException('用户不存在')
        }
        try {
            user.status = s
            const { status } = await this.user.save(user)
            return { status, message: '更新用户状态成功' }
        } catch (error) {
            throw new BadRequestException('更新用户状态失败')
        }
    }
}
