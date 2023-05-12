import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator'

export class CreateUserDto {
    @ApiProperty({
        description: '用户名',
        required: true
    })
    @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
        message: '用户名只能包含字母、数字、下划线和减号，且长度为3-16位'
    })
    readonly userName: string

    @ApiProperty({
        description: '密码',
        required: true
    })
    @IsString()
    @Length(8, 20, { message: '密码长度为8-20' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
        message: '密码必须包含至少一个字母和一个数字，长度在8到20个字符之间'
    })
    // @Matches(/^[a-zA-Z0-9]+$/, {
    //     message: '密码不能包含特殊字符'
    // })
    readonly password: string

    @ApiProperty({
        description: '昵称',
        required: true
    })
    @IsString({ message: '昵称类型错误，正确类型 string' })
    @IsNotEmpty({ message: '昵称不能为空!' })
    @MinLength(2, { message: '昵称至少2个字符' })
    @MaxLength(20, { message: '昵称最多20个字符' })
    readonly nickName: string

    @ApiProperty({
        description: '邮箱',
        required: false,
        default: ''
    })
    @IsEmail({}, { message: '邮箱格式不正确' })
    @IsOptional()
    readonly email: SVGStringList

    @ApiProperty({
        description: '手机号码',
        required: false,
        default: ''
    })
    // @Matches(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, {
    //     message: '手机号格式不正确'
    // })
    @IsOptional()
    readonly phonenumber: string

    @ApiProperty({
        description: '性别',
        required: false,
        enum: ['0', '1', '2'],
        default: '2'
    })
    @IsOptional()
    @IsIn(['0', '1', '2'], { message: "性别只能为：['0', '1', '2']" })
    readonly sex: string = '2'

    @ApiProperty({
        description: '账号状态',
        required: false,
        enum: ['0', '1'],
        default: '0'
    })
    @IsOptional()
    @IsIn(['0', '1'], { message: "账号状态只能为：['0', '1']" })
    readonly status: string = '0'

    @ApiProperty({
        description: '角色',
        required: true,
        enum: [1, 2, 3],
        default: 2
    })
    @IsInt()
    @IsIn([1, 2, 3], { message: '角色只能为：[1,2,3]' })
    readonly role: number = 2
}
