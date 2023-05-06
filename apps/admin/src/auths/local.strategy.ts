import { IStrategyOptions, Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { CryptoService } from '@app/common/crypto/crypto.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly cryptoService: CryptoService
    ) {
        super({ usernameField: 'username', passwordField: 'password' } as IStrategyOptions)
    }
    async validate(username: string, password: string): Promise<any> {
        // 查找用户
        const user = await this.usersService.findByUsername(username)
        if (!user) {
            throw new UnauthorizedException({ message: '用户名或密码错误' })
        }
        // 获取加密后的密码进行对比
        const reqPwd = this.cryptoService.decryptPwd(password, user.pwdSalt)

        // 如果不一样，则验证失败
        if (reqPwd !== user.password) {
            throw new UnauthorizedException()
        }
        // 如果一样，则通过
        return true
    }
}
