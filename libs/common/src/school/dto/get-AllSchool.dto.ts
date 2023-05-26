import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { PagenationOptionsDto } from './pagination.dto'

export class getAllSchoolDto extends PagenationOptionsDto {
    @ApiProperty({
        description: '省份',
        required: false
    })
    @IsOptional()
    readonly province: string = ''

    @ApiProperty({
        description: '学校名称',
        required: false
    })
    @IsOptional()
    readonly name: string = ''
}
