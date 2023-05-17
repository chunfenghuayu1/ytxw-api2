import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntiy } from './base.entity'
import { UserRoleEntity } from './user-role.entity'
import { Exclude } from 'class-transformer'

@Entity('sys_role', { schema: 'ytxw' })
export class RoleEntity extends BaseEntiy {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'role_id',
        comment: '角色ID'
    })
    @Exclude({ toPlainOnly: true })
    roleId: number

    @Column('varchar', { name: 'role_name', comment: '角色名称', length: 30 })
    roleName: string

    @Column('varchar', {
        name: 'role_key',
        comment: '角色权限字符串',
        length: 100
    })
    // @Exclude({ toPlainOnly: true })
    roleKey: string

    @Column('int', { name: 'role_sort', comment: '显示顺序' })
    @Exclude({ toPlainOnly: true })
    roleSort: number

    @Column('char', {
        name: 'data_scope',
        nullable: true,
        comment: '数据范围（1：全部数据权限 2：自定数据权限 ）',
        length: 1,
        default: () => "'1'"
    })
    @Exclude({ toPlainOnly: true })
    dataScope: string | null

    @Column('tinyint', {
        name: 'menu_check_strictly',
        nullable: true,
        comment: '菜单树选择项是否关联显示',
        width: 1,
        default: () => "'1'"
    })
    @Exclude({ toPlainOnly: true })
    menuCheckStrictly: boolean | null

    @Column('char', {
        name: 'status',
        comment: '角色状态（0正常 1停用）',
        length: 1
    })
    @Exclude({ toPlainOnly: true })
    status: string

    @Column('char', {
        name: 'del_flag',
        nullable: true,
        comment: '删除标志（0代表存在 1代表删除）',
        length: 1,
        default: () => "'0'"
    })
    @Exclude({ toPlainOnly: true })
    delFlag: string | null

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    @Exclude({ toPlainOnly: true })
    remark: string | null

    @OneToMany(() => UserRoleEntity, userRole => userRole.role)
    public userRoles: UserRoleEntity[]
}
