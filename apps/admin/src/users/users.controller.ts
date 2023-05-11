import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetAllUserDto } from './dto/get-allUser.dto'

@ApiTags('用户')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // 创建用户
    @Post()
    @ApiOperation({ summary: '创建用户' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.usersService.createUser(createUser)
    }

    // 查询所有用户
    @Get()
    @ApiOperation({ summary: '查询所有用户或部分符合条件的用户' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getAllUser(@Query() { userName, nickName }: GetAllUserDto) {
        if (userName || nickName) {
            return await this.usersService.findByCondition(userName, nickName)
        }
        return await this.usersService.findAll()
    }
}
