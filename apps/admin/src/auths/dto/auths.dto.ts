import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        description: '用户名',
        required: true,
        example: 'admin'
    })
    @IsNotEmpty({ message: '用户名不能为空!' })
    readonly username: string

    @ApiProperty({
        description: '密码',
        required: true,
        example: '123456'
    })
    @IsNotEmpty({ message: '密码不能为空!' })
    readonly password: string
}
