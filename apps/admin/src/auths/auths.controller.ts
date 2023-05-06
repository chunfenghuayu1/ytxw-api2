import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/auths.dto'
import { AuthsService } from './auths.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from '../users/users.service'

@Controller()
@ApiTags('登录')
export class AuthsController {
    constructor(
        private readonly authsService: AuthsService,
        private readonly usersService: UsersService
    ) {}

    @Post('login')
    @ApiOperation({ summary: '用户登录' })
    @UseGuards(AuthGuard('local'))
    async login(@Body() loginDto: LoginDto) {
        return await this.authsService.login(loginDto)
    }

    // 获取用户信息
    @Post('getInfo')
    @ApiOperation({ summary: '登录后获取用户相关信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getInfo(@Req() req) {
        return await this.usersService.getInfo(req.user.username)
    }
}
