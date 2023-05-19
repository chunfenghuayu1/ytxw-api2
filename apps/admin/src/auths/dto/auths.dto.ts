import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        description: '用户名',
        required: true,
        example: 'admin'
    })
    @IsString({ message: '用户名类型错误，正确类型 string' })
    @IsNotEmpty({ message: '用户名不能为空!' })
    @MinLength(5, { message: '用户名至少5个字符' })
    @MaxLength(20, { message: '用户名最多20个字符' })
    readonly userName: string

    @ApiProperty({
        description: '密码',
        required: true,
        example: '123456'
    })
    @IsNotEmpty({ message: '密码不能为空!' })
    readonly password: string
}
