import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class PagenationMetaDto {
    // 当前页数量
    itemCount: number
    // 总数量
    totalItems?: number
    // 每页数量
    perPage: number
    // 总页数
    totalPages?: number
    // 当前页数
    currentPage: number
}

export class PagenationOptionsDto {
    // 当前页数
    @ApiProperty({
        description: '当前页数',
        required: false,
        default: 1
    })
    @IsOptional()
    readonly page: number = 1
    // 每页显示数量
    @ApiProperty({
        description: '每页显示数量',
        required: false,
        default: 10
    })
    @IsOptional()
    readonly limit: number = 10
}
