import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Index('menu_id', ['menuId'], {})
@Entity('sys_menu', { schema: 'ytxw' })
export class SysMenu {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'menu_id',
        comment: '菜单ID'
    })
    menuId: number

    @Column('varchar', { name: 'menu_name', comment: '菜单名称', length: 50 })
    menuName: string

    @Column('bigint', {
        name: 'parent_id',
        nullable: true,
        comment: '父菜单ID',
        default: 0
    })
    parentId: number | null

    @Column('int', {
        name: 'orderNo',
        nullable: true,
        comment: '显示顺序',
        default: 0
    })
    orderNo: number | null

    @Column('varchar', {
        name: 'path',
        nullable: true,
        comment: '路由地址',
        length: 200
    })
    path: string | null

    @Column('varchar', {
        name: 'redirect',
        nullable: true,
        comment: '重定向地址',
        length: 200
    })
    redirect: string | null

    @Column('varchar', {
        name: 'component',
        nullable: true,
        comment: '组件路径',
        length: 255
    })
    component: string | null

    @Column('varchar', {
        name: 'query',
        nullable: true,
        comment: '路由参数',
        length: 255
    })
    query: string | null

    @Column('enum', {
        name: 'is_frame',
        nullable: true,
        comment: '是否为外链（0是 1否）',
        enum: ['0', '1'],
        default: () => '0'
    })
    isFrame: '0' | '1' | null

    @Column('enum', {
        name: 'is_cache',
        nullable: true,
        comment: '是否缓存（0缓存 1不缓存）',
        enum: ['0', '1'],
        default: () => '0'
    })
    isCache: '0' | '1' | null

    @Column('enum', {
        name: 'menu_type',
        nullable: true,
        comment: '菜单类型（M目录 C菜单 F按钮）',
        enum: ['M', 'C', 'F'],
        default: 'M'
    })
    menuType: 'M' | 'C' | 'F' | null

    @Column('enum', {
        name: 'visible',
        nullable: true,
        comment: '菜单状态（0显示 1隐藏）',
        enum: ['0', '1'],
        default: () => '0'
    })
    visible: '0' | '1' | null

    @Column('enum', {
        name: 'status',
        nullable: true,
        comment: '菜单状态（0正常 1停用）',
        enum: ['0', '1'],
        default: () => '0'
    })
    status: '0' | '1' | null

    @Column('varchar', {
        name: 'perms',
        nullable: true,
        comment: '权限标识',
        length: 100
    })
    perms: string | null

    @Column('varchar', {
        name: 'icon',
        nullable: true,
        comment: '菜单图标',
        length: 100,
        default: '#'
    })
    icon: string | null

    @Column('varchar', {
        name: 'title',
        nullable: true,
        comment: '显示菜单名',
        length: 200
    })
    title: string | null

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
