import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from '../entities/SysUser.entity'

const modules = TypeOrmModule.forFeature([SysUser])

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
