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
    async login(@Body() loginDto: LoginDto, @Req() req) {
        // 当参数不正确时，本地策略会自动抛出Unauthorized异常
        const { user } = req
        return await this.authsService.login(user)
    }

    // 获取用户信息、权限、角色
    @Post('getInfo')
    @ApiOperation({ summary: '登录后获取用户相关信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getInfo(@Req() req) {
        return await this.usersService.getInfo(req.user.uid)
    }

    // 获取路由信息
    @Post('getRouters')
    @ApiOperation({ summary: '获取路由信息', deprecated: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getRouters(@Req() req) {
        return { message: '停用' }
        // return await this.usersService.getRouters(req.user.uid)
    }
}
