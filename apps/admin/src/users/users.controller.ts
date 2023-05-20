import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetAllUserDto } from './dto/get-allUser.dto'
import { plainToClass } from 'class-transformer'
import { ChangeUserStatusDto, UpdateUserDto } from './dto/update-user.dto'

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
        return await this.usersService.createUser(plainToClass(CreateUserDto, createUser))
    }

    // 查询所有用户
    @Get()
    @ApiOperation({ summary: '查询所有用户或部分符合条件的用户' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getAllUser(@Query() getAllUser: GetAllUserDto) {
        return await this.usersService.findAll(getAllUser)
    }

    // 修改用户信息
    @Put(':id')
    @ApiOperation({ summary: '修改用户信息 只有管理员能改' })
    @ApiParam({
        name: 'id',
        description: '用户ID',
        type: Number
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        return await this.usersService.updateUser(id, updateUser)
    }

    // 修改用户状态
    @Post('status')
    @ApiOperation({ summary: '修改用户状态 只有管理员能改' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async changeUserStatus(@Body() data: ChangeUserStatusDto) {
        return this.usersService.changeUserStatus(data)
    }
}
