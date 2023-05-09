import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('用户')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // 创建用户
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.usersService.createUser(createUser)
    }
}
