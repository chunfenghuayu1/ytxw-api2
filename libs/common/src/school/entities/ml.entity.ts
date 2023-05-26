import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../../../apps/admin/src/entities/base.entity'

@Entity('sys_dict_Ml', { schema: 'ytxw' })
export class MlEntity extends BaseEntity {
    @Column('int', { primary: true, name: 'dm', comment: '门类id' })
    dm: number

    @Column('varchar', {
        name: 'mc',
        nullable: true,
        comment: '门类名称',
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
}
