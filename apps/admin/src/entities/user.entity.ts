import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude, Transform } from 'class-transformer'
import * as moment from 'moment'
import { BaseEntiy } from './base.entity'
import { UserRoleEntity } from './user-role.entity'

@Entity('sys_user', { schema: 'ytxw' })
export class UserEntity extends BaseEntiy {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
        comment: '用户ID'
    })
    userId: number

    @Column('bigint', { name: 'dept_id', nullable: true, comment: '部门ID' })
    deptId: number | null

    @Column('varchar', { name: 'user_name', comment: '用户账号', length: 30 })
    userName: string

    @Column('varchar', { name: 'nick_name', comment: '用户昵称', length: 30 })
    nickName: string

    @Column('varchar', {
        name: 'user_type',
        nullable: true,
        comment: '用户类型（00系统用户，01微信用户）',
        length: 2,
        default: () => "'00'"
    })
    userType: string | null

    @Column('varchar', {
        name: 'email',
        nullable: true,
        comment: '用户邮箱',
        length: 50
    })
    email: string | null

    @Column('varchar', {
        name: 'phonenumber',
        nullable: true,
        comment: '手机号码',
        length: 11
    })
    phonenumber: string | null

    @Column('char', {
        name: 'sex',
        nullable: true,
        comment: '用户性别（0男 1女 2未知）',
        length: 1,
        default: () => "'2'"
    })
    sex: string | null

    @Column('varchar', {
        name: 'avatar',
        nullable: true,
        comment: '头像地址',
        length: 100
    })
    avatar: string | null

    @Column('varchar', {
        name: 'password',
        nullable: true,
        comment: '密码',
        length: 100
    })
    @Exclude({ toPlainOnly: true })
    password: string | null

    @Column('varchar', {
        name: 'pwd_salt',
        nullable: true,
        comment: '密码盐',
        length: 8
    })
    @Exclude({ toPlainOnly: true })
    pwdSalt: string | null

    @Column('char', {
        name: 'status',
        nullable: true,
        comment: '帐号状态（0正常 1停用）',
        length: 1,
        default: () => "'0'"
    })
    status: string | null

    @Column('char', {
        name: 'del_flag',
        nullable: true,
        comment: '删除标志（0代表存在 2代表删除）',
        length: 1,
        default: () => "'0'"
    })
    @Exclude({ toPlainOnly: true })
    delFlag: string | null

    @Column('varchar', {
        name: 'login_ip',
        nullable: true,
        comment: '最后登录IP',
        length: 50
    })
    @Exclude({ toPlainOnly: true })
    loginIp: string | null

    @Column('datetime', {
        name: 'login_date',
        nullable: true,
        comment: '最后登录时间'
    })
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
    loginDate: Date | null

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    @Exclude({ toPlainOnly: true })
    remark: string | null

    // 角色关系
    @OneToMany(() => UserRoleEntity, userRoles => userRoles.user, {
        cascade: ['insert', 'remove'],
        nullable: false
    })
    public userRoles!: UserRoleEntity[]
}
