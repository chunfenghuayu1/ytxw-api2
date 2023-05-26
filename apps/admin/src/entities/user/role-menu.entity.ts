import { Column, Entity } from 'typeorm'

@Entity('sys_role_menu', { schema: 'ytxw' })
export class RoleMenuEntity {
    @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
    roleId: number

    @Column('bigint', { primary: true, name: 'menu_id', comment: '菜单ID' })
    menuId: number
}
