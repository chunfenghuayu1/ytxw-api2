import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../../../apps/admin/src/entities/base.entity'

@Entity('sys_schools', { schema: 'ytxw' })
export class SchoolEntity extends BaseEntity {
    @Column('int', { primary: true, name: 'id', comment: '学校代码' })
    id: number

    @Column('varchar', {
        name: 'name',
        nullable: true,
        comment: '学校名称',
        length: 50
    })
    name: string | null

    @Column('varchar', {
        name: 'province',
        nullable: true,
        comment: '省份名称',
        length: 20
    })
    province: string | null

    @Column('varchar', {
        name: 'is_985',
        nullable: true,
        comment: '是否985（0是，1否）',
        length: 1,
        default: () => "'1'"
    })
    is_985: string | null

    @Column('varchar', {
        name: 'is_211',
        nullable: true,
        comment: '是否211（0是，1否）',
        length: 1,
        default: () => "'1'"
    })
    is_211: string | null

    @Column('varchar', {
        name: 'is_first',
        nullable: true,
        comment: '是否双一流（0是，1否）',
        length: 1,
        default: () => "'1'"
    })
    isFirst: string | null

    @Column('varchar', {
        name: 'is_Btype',
        nullable: true,
        comment: '是否B区（0是，1否）',
        length: 1,
        default: () => "'1'"
    })
    isBtype: string | null

    @Column('int', { name: 'rank', nullable: true, comment: '学校排名' })
    rank: number | null

    @Column('varchar', {
        name: 'icon',
        nullable: true,
        comment: '学校图标',
        length: 255
    })
    icon: string | null

    @Column('varchar', {
        name: 'belong',
        nullable: true,
        comment: '隶属',
        length: 64
    })
    belong: string | null
}
