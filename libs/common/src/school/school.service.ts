import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { SchoolEntity } from './entities/school.entity'
import { instanceToPlain, plainToClass } from 'class-transformer'
import { getAllSchoolDto } from './dto/get-AllSchool.dto'
import { SsEntity } from './entities/ss.entity'

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(SchoolEntity) private readonly school: Repository<SchoolEntity>,
        @InjectRepository(SsEntity) private readonly province: Repository<SsEntity>
    ) {}

    // 创建学校
    async create(school: CreateSchoolDto, req) {
        const { uid } = req.user
        const { name, id } = school
        const res = await this.school.findOne({
            where: {
                name,
                id
            }
        })
        if (res) {
            throw new BadRequestException({ message: '学校已存在' })
        }
        try {
            const newSchool = plainToClass(SchoolEntity, school)
            newSchool.createBy = uid
            const res = await this.school.save(newSchool)
            return { message: '学校创建成功', data: instanceToPlain(res) }
        } catch (error) {
            throw new BadRequestException({ message: '学校创建失败' })
        }
    }

    // 搜索所有学校/按条件搜索
    async findAll(getAllSchool: getAllSchoolDto): Promise<Record<string, any>> {
        const { province, name, page, limit } = getAllSchool
        const rpage = page > 0 ? page : 0
        try {
            const [res, total] = await this.school.findAndCount({
                where: { province: Like(`%${province}%`), name: Like(`%${name}%`) },
                select: {
                    id: true,
                    name: true,
                    is_985: true,
                    is_211: true,
                    isFirst: true,
                    isBtype: true,
                    province: true,
                    rank: true,
                    icon: true,
                    belong: true,
                    updateTime: true,
                    updateBy: true
                },
                skip: (rpage - 1) * limit,
                take: limit
            })
            return {
                list: instanceToPlain(res),
                total
            }
        } catch (error) {
            throw new BadRequestException({ message: '获取学校信息失败' })
        }
    }

    // 所有省份
    async getAllProvince() {
        try {
            const res = await this.province.find({
                select: { dm: true, mc: true },
                where: { status: '0' }
            })
            return instanceToPlain(res)
        } catch (error) {
            throw new BadRequestException({ message: '获取省份失败' })
        }
    }
}
