import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { instanceToPlain, plainToClass } from 'class-transformer'
import { UserRoleEntity } from '../entities/user-role.entity'
import { RoleMenuEntity } from '../entities/role-menu.entity'
import { MenuEntity } from '../entities/menu.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { CryptoService } from '@app/common/crypto/crypto.service'

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
    async findAll(): Promise<Record<string, any>> {
        const res = await this.user.find()
        return instanceToPlain(res)
    }

    // 根据条件模糊查找用户
    async findByCondition(userName?: string, nickName?: string): Promise<Record<string, any>> {
        const res = await this.user.find({
            where: { userName: Like(`%${userName}%`), nickName: Like(`%${nickName}%`) }
        })
        return instanceToPlain(res)
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
            .select([
                'menu.menuId as menuId',
                'menu.parentId as parentId',
                'menu.path as path',
                'menu.menuName as name',
                'menu.component as component',
                'menu.redirect as redirect',
                'menu.orderNo as orderNo',
                'menu.icon as icon',
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
                    redirect: route.redirect,
                    meta: {
                        title: route.title,
                        icon: route.icon,
                        orderNo: route.orderNo
                    }
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
        // 密码加密，返回
        const { password, pwdSalt } = this.cryptoService.encryptPwd(userWithoutRole.password)

        // 保存加密密码到user
        const newUser = plainToClass(
            UserEntity,
            Object.assign(userWithoutRole, { password, pwdSalt })
        )

        // 级联实体
        const userRole = this.userRole.create({ roleId: role })
        newUser.userRoles = [userRole]
        // 保存到数据库
        const result = await this.user.save(newUser)

        return { user: instanceToPlain(result) }
    }
}
