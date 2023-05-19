import { PickType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PickType(CreateUserDto, [
    'userName',
    'nickName',
    'email',
    'phonenumber',
    'sex',
    'status',
    'role'
] as const) {}
