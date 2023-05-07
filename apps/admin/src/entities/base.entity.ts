import { Transform } from 'class-transformer'
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as moment from 'moment'

export class BaseEntiy {
    @Column('varchar', {
        name: 'create_by',
        nullable: true,
        comment: '创建者',
        length: 64
    })
    createBy: string | null

    @CreateDateColumn({
        type: 'datetime',
        name: 'create_time',
        comment: '创建时间',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
    createTime: Date

    @Column('varchar', {
        name: 'update_by',
        nullable: true,
        comment: '更新者',
        length: 64
    })
    updateBy: string | null

    @UpdateDateColumn({
        type: 'datetime',
        name: 'update_time',
        nullable: true,
        comment: '更新时间'
    })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
    updateTime: Date | null
}
