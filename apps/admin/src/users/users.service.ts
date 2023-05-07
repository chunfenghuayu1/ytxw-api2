import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { instanceToPlain } from 'class-transformer'
import { RoleEntity } from '../entities/role.entity'
import { UserRoleEntity } from '../entities/user-role.entity'
import { RoleMenuEntity } from '../entities/role-menu.entity'
import { MenuEntity } from '../entities/menu.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
        @InjectRepository(UserRoleEntity) private readonly userRole: Repository<UserRoleEntity>,
        @InjectRepository(MenuEntity) private readonly menu: Repository<MenuEntity>
    ) {}

    // 根据username查找用户 未删除且未停用
    async findByUsername(userName: string): Promise<UserEntity> {
        const res = await this.user.findOne({ where: { userName, status: '0', delFlag: '0' } })
        return res
    }

    // 登录记录时间
    async loginDateById(userId: number) {
        await this.user.update({ userId }, { loginDate: new Date() })
    }

    // 创建用户
    async createUser() {
        await this.user.save({ userName: 'abc', nickName: '111' })
    }

    // 获取用户信息
    async getInfo(userId: number): Promise<any> {
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
    async getRouters(userId: number): Promise<any> {
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
        return instanceToPlain(routers)
    }
}
