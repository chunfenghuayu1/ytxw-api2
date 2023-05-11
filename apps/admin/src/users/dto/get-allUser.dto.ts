import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class GetAllUserDto {
    @ApiProperty({
        description: '用户名',
        required: false
    })
    @IsOptional()
    readonly userName: string = ''

    @ApiProperty({
        description: '用户昵称',
        required: false
    })
    @IsOptional()
    readonly nickName: string = ''
}
