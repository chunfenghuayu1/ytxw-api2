import { Column, Entity, Index } from 'typeorm'

@Index('role_id', ['roleId'], {})
@Index('menu_id', ['menuId'], {})
@Entity('sys_role_menu', { schema: 'ytxw' })
export class SysRoleMenu {
    @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
    roleId: number

    @Column('bigint', { primary: true, name: 'menu_id', comment: '菜单ID' })
    menuId: number
}
