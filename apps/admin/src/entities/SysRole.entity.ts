import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Index('role_id', ['roleId'], {})
@Entity('sys_role', { schema: 'ytxw' })
export class SysRole {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'role_id',
        comment: '角色ID'
    })
    roleId: number

    @Column('varchar', { name: 'role_name', comment: '角色名称', length: 30 })
    roleName: string

    @Column('varchar', {
        name: 'role_key',
        comment: '角色权限字符串',
        length: 100
    })
    roleKey: string

    @Column('int', { name: 'role_sort', comment: '显示顺序' })
    roleSort: number

    @Column('enum', {
        name: 'data_scope',
        nullable: true,
        comment: '数据范围（1：全部数据权限 2：自定数据权限 ）',
        enum: ['1', '2'],
        default: () => '1'
    })
    dataScope: '1' | '2' | null

    @Column('tinyint', {
        name: 'menu_check_strictly',
        nullable: true,
        comment: '菜单树选择项是否关联显示',
        width: 1,
        default: 1
    })
    menuCheckStrictly: boolean | null

    @Column('enum', {
        name: 'status',
        comment: '角色状态（0正常 1停用）',
        enum: ['0', '1'],
        default: '0'
    })
    status: '0' | '1'

    @Column('enum', {
        name: 'del_flag',
        nullable: true,
        comment: '删除标志（0代表存在 2代表删除）',
        enum: ['0', '2'],
        default: () => '0'
    })
    delFlag: '0' | '2' | null

    @Column('varchar', {
        name: 'create_by',
        nullable: true,
        comment: '创建者',
        length: 64
    })
    createBy: string | null

    @Column({
        type: 'datetime',
        name: 'create_time',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '创建时间'
    })
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
        default: () => 'CURRENT_TIMESTAMP',
        comment: '更新时间'
    })
    updateTime: Date

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    remark: string | null
}
