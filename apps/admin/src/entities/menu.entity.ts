import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntiy } from './base.entity'

@Entity('sys_menu', { schema: 'ytxw' })
export class MenuEntity extends BaseEntiy {
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
        default: () => "'0'"
    })
    parentId: number | null

    @Column('int', {
        name: 'orderNo',
        nullable: true,
        comment: '显示顺序',
        default: () => "'0'"
    })
    orderNo: number | null

    @Column({
        type: 'tinyint',
        name: 'alwaysShow',
        nullable: true,
        comment: '是否显示菜单（0false 1true）',
        width: 1,
        default: () => 0
    })
    alwaysShow: number

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

    @Column('int', {
        name: 'is_frame',
        nullable: true,
        comment: '是否为外链（0是 1否）',
        default: () => "'1'"
    })
    isFrame: number | null

    @Column('int', {
        name: 'is_cache',
        nullable: true,
        comment: '是否缓存（0缓存 1不缓存）',
        default: () => "'0'"
    })
    isCache: number | null

    @Column('char', {
        name: 'menu_type',
        nullable: true,
        comment: '菜单类型（M目录 C菜单 F按钮）',
        length: 1,
        default: () => "'M'"
    })
    menuType: string | null

    @Column('char', {
        name: 'visible',
        nullable: true,
        comment: '菜单状态（0显示 1隐藏）',
        length: 1,
        default: () => "'0'"
    })
    visible: string | null

    @Column('char', {
        name: 'status',
        nullable: true,
        comment: '菜单状态（0正常 1停用）',
        length: 1,
        default: () => "'0'"
    })
    status: string | null

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
        default: () => "'#'"
    })
    icon: string | null

    @Column('varchar', {
        name: 'title',
        nullable: true,
        comment: '菜单名',
        length: 200
    })
    title: string | null

    @Column('varchar', {
        name: 'remark',
        nullable: true,
        comment: '备注',
        length: 500
    })
    remark: string | null
}
