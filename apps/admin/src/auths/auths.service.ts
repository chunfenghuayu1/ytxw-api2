import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/auths.dto'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthsService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        await this.usersService.loginDateByName(loginDto.username)
        return {
            t: await this.jwtService.signAsync({ username: loginDto.username })
        }
    }
}
