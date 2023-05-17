import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { PagenationOptionsDto } from './pagination.dto'

export class GetAllUserDto extends PagenationOptionsDto {
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
