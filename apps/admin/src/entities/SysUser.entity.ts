import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('user_id', ['userId'], {})
@Entity('sys_user', { schema: 'ytxw' })
export class SysUser {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
        comment: '用户ID'
    })
    userId: string

    @Column('bigint', { name: 'dept_id', nullable: true, comment: '部门ID' })
    deptId: string | null

    @Column('varchar', { name: 'user_name', comment: '用户账户', length: 30 })
    userName: string

    @Column('varchar', { name: 'nick_name', comment: '用户昵称', length: 30 })
    nickName: string

    @Column('enum', {
        name: 'user_type',
        nullable: true,
        comment: '用户类型（00系统用户，01微信用户）',
        enum: ['00', '01'],
        default: () => '00'
    })
    userType: '00' | '01' | null

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

    @Column('enum', {
        name: 'sex',
        nullable: true,
        comment: '用户性别（0男 1女 2未知）',
        enum: ['0', '1', '2'],
        default: () => '2'
    })
    sex: '0' | '1' | '2' | null

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
    password: string | null

    @Column('varchar', {
        name: 'pwd_salt',
        nullable: true,
        comment: '密码盐',
        length: 8
    })
    pwdSalt: string | null

    @Column('enum', {
        name: 'status',
        nullable: true,
        comment: '帐号状态（0正常 1停用）',
        enum: ['0', '1'],
        default: () => '0'
    })
    status: '0' | '1' | null

    @Column('enum', {
        name: 'del_flag',
        nullable: true,
        comment: '删除标志（0代表存在 2代表删除）',
        enum: ['0', '2'],
        default: () => '0'
    })
    delFlag: '0' | '2' | null

    @Column('varchar', {
        name: 'login_ip',
        nullable: true,
        comment: '最后登录IP',
        length: 128
    })
    loginIp: string | null

    @Column('datetime', {
        name: 'login_date',
        nullable: true,
        comment: '最后登录时间'
    })
    loginDate: Date | null

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

    @Column({
        type: 'datetime',
        name: 'update_time',
        nullable: true,
        comment: '更新时间'
    })
    updateTime: Date | null

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    remark: string | null
}
