import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { SsEntity } from '../../common/src/school/entities/ss.entity'
import { MlEntity } from '../../common/src/school/entities/ml.entity'
import { SchoolEntity } from '../../common/src/school/entities/school.entity'
/**
 * 公共db模块
 */
const modules = TypeOrmModule.forFeature([SsEntity, MlEntity, SchoolEntity])

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
export class DbModule {}
