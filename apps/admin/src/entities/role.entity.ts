import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntiy } from './base.entity'
import { UserRoleEntity } from './user-role.entity'

@Entity('sys_role', { schema: 'ytxw' })
export class RoleEntity extends BaseEntiy {
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

    @Column('char', {
        name: 'data_scope',
        nullable: true,
        comment: '数据范围（1：全部数据权限 2：自定数据权限 ）',
        length: 1,
        default: () => "'1'"
    })
    dataScope: string | null

    @Column('tinyint', {
        name: 'menu_check_strictly',
        nullable: true,
        comment: '菜单树选择项是否关联显示',
        width: 1,
        default: () => "'1'"
    })
    menuCheckStrictly: boolean | null

    @Column('char', {
        name: 'status',
        comment: '角色状态（0正常 1停用）',
        length: 1
    })
    status: string

    @Column('char', {
        name: 'del_flag',
        nullable: true,
        comment: '删除标志（0代表存在 1代表删除）',
        length: 1,
        default: () => "'0'"
    })
    delFlag: string | null

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    remark: string | null

    @OneToMany(() => UserRoleEntity, userRole => userRole.role)
    public userRoles: UserRoleEntity[]
}
