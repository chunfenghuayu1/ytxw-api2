import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysUser } from 'apps/admin/src/entities/SysUser.entity'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(SysUser) private readonly sysUser: Repository<SysUser>) {}

    // 根据username查找用户 未删除且未停用
    async findByUsername(userName: string): Promise<SysUser> {
        const res = await this.sysUser.findOne({ where: { userName, status: '0', delFlag: '0' } })
        return res
    }

    // 登录记录时间
    async loginDateByName(userName: string) {
        await this.sysUser.update({ userName }, { loginDate: new Date() })
    }

    // 创建用户
    async createUser() {
        await this.sysUser.save({ userName: 'abc', nickName: '111' })
    }

    // 获取用户信息
    async getInfo(userName: string): Promise<any> {
        const res = await this.sysUser.findOne({ where: { userName } })
        console.log(res)

        return res
    }
}
