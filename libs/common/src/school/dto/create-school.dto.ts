import { ApiProperty } from '@nestjs/swagger'
import {
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    Min
} from 'class-validator'

export class CreateSchoolDto {
    @ApiProperty({
        description: '学校代码',
        required: true
    })
    @IsNotEmpty({ message: '学校代码不能为空!' })
    @IsInt({ message: '学校代码为数字' })
    @Min(10000, { message: '学校代码长度为5位数字' })
    @Max(99999, { message: '学校代码长度为5位数字' })
    readonly id: number

    @ApiProperty({
        description: '学校名称',
        required: true
    })
    @IsNotEmpty({ message: '学校名称不能为空!' })
    @IsString()
    readonly name: string

    @ApiProperty({
        description: '省份',
        required: true
    })
    @IsNotEmpty({ message: '省份不能为空!' })
    @IsString()
    readonly province: string

    @ApiProperty({
        description: '是否985',
        required: true,
        enum: ['0', '1'],
        default: '1'
    })
    @IsNotEmpty()
    @IsIn(['0', '1'], { message: "只能为：['0', '1']" })
    readonly is_985: string

    @ApiProperty({
        description: '是否211',
        required: true,
        enum: ['0', '1'],
        default: '1'
    })
    @IsNotEmpty()
    @IsIn(['0', '1'], { message: "只能为：['0', '1']" })
    readonly is_211: string

    @ApiProperty({
        description: '是否双一流',
        required: true,
        enum: ['0', '1'],
        default: '1'
    })
    @IsNotEmpty()
    @IsIn(['0', '1'], { message: "只能为：['0', '1']" })
    readonly isFirst: string

    @ApiProperty({
        description: '是否B区',
        required: true,
        enum: ['0', '1'],
        default: '1'
    })
    @IsNotEmpty()
    @IsIn(['0', '1'], { message: "只能为：['0', '1']" })
    readonly isBtype: string

    @ApiProperty({
        description: '学校图标',
        required: false
    })
    @IsUrl({}, { message: '校徽必须为url' })
    @IsOptional()
    readonly icon: string

    @ApiProperty({
        description: '学校排名',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    readonly rank: number

    @ApiProperty({
        description: '隶属',
        required: true
    })
    @IsNotEmpty()
    readonly belong: string
}
