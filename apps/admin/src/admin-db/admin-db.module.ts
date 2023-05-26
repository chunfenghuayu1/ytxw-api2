import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '../entities/user/role.entity'
import { RoleMenuEntity } from '../entities/user/role-menu.entity'
import { MenuEntity } from '../entities/user/menu.entity'
import { UserEntity } from '../entities/user/user.entity'
import { UserRoleEntity } from '../entities/user/user-role.entity'

const modules = TypeOrmModule.forFeature([
    UserEntity,
    UserRoleEntity,
    RoleEntity,
    RoleMenuEntity,
    MenuEntity
])

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService]
        }),
        modules
    ],
    exports: [modules]
})
export class AdminDbModule {}
