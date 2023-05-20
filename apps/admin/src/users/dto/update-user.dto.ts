import { ApiProperty, PickType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateUserDto extends PickType(CreateUserDto, [
    'userName',
    'nickName',
    'email',
    'phonenumber',
    'sex',
    'status',
    'role'
] as const) {}

export class ChangeUserStatusDto {
    @ApiProperty({
        description: '账号状态',
        required: true,
        enum: ['0', '1']
    })
    @IsNotEmpty({ message: '账号状态不能为空!' })
    @IsIn(['0', '1'], { message: "账号状态只能为：['0', '1']" })
    readonly status: string

    @ApiProperty({
        description: '账号ID',
        required: true
    })
    @IsNotEmpty({ message: 'ID不能为空!' })
    @IsInt()
    readonly userId: number
}
