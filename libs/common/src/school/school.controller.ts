import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Req } from '@nestjs/common'
import { SchoolService } from './school.service'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { getAllSchoolDto } from './dto/get-AllSchool.dto'

@ApiTags('学校')
@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    @ApiOperation({ summary: '添加学校信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createSchoolDto: CreateSchoolDto, @Req() req) {
        return this.schoolService.create(createSchoolDto, req)
    }

    @Get()
    @ApiOperation({ summary: '查询所有学校' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findAll(@Query() getAllSchool: getAllSchoolDto) {
        return this.schoolService.findAll(getAllSchool)
    }

    @Get('province')
    @ApiOperation({ summary: '查询省份' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    getProvince() {
        return this.schoolService.getAllProvince()
    }
}
