import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { UserEntity } from '../entities/user/user.entity'

@Injectable()
export class AuthsService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(user: UserEntity): Promise<any> {
        // 更新登录时间
        await this.usersService.loginDateById(user.userId)
        // 返回token
        return {
            t: await this.jwtService.signAsync({ uid: user.userId })
        }
    }
}
