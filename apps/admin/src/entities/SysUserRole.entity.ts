import { Column, Entity, Index } from 'typeorm'

@Index('user_id', ['userId'], {})
@Index('role_id', ['roleId'], {})
@Entity('sys_user_role', { schema: 'ytxw' })
export class SysUserRole {
    @Column('bigint', { primary: true, name: 'user_id', comment: '用户ID' })
    userId: number

    @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
    roleId: number
}
