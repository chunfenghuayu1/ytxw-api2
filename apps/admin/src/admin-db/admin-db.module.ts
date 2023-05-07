import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { UserRoleEntity } from '../entities/user-role.entity'
import { RoleEntity } from '../entities/role.entity'
import { RoleMenuEntity } from '../entities/role-menu.entity'
import { MenuEntity } from '../entities/menu.entity'

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
