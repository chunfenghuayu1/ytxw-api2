import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { RoleEntity } from './role.entity'

@Entity('sys_user_role', { schema: 'ytxw' })
export class UserRoleEntity {
    @Column('bigint', { primary: true, name: 'user_id', comment: '用户ID' })
    userId: number

    @Column('bigint', { primary: true, name: 'role_id', comment: '角色ID' })
    roleId: number

    @ManyToOne(() => UserEntity, user => user.userRoles)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity

    @ManyToOne(() => RoleEntity, role => role.userRoles)
    @JoinColumn({ name: 'role_id' })
    role!: RoleEntity
}
