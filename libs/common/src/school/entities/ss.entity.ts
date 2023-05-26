import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../../../apps/admin/src/entities/base.entity'

@Entity('sys_dict_Ss', { schema: 'ytxw' })
export class SsEntity extends BaseEntity {
    @Column('int', { primary: true, name: 'dm', comment: '省份id' })
    dm: number

    @Column('varchar', {
        name: 'mc',
        nullable: true,
        comment: '省份名称',
        length: 100
    })
    mc: string | null

    @Column('varchar', {
        name: 'status',
        nullable: true,
        comment: '状态（0正常 1停用）',
        length: 1,
        default: () => "'0'"
    })
    status: string | null

    @Column('varchar', {
        name: 'is_Btype',
        nullable: true,
        comment: '是否b区省份（0A区 1B区）',
        length: 1,
        default: () => "'0'"
    })
    isBtype: string | null
}
