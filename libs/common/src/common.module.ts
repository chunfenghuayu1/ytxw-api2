import { Global, MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { CommonService } from './common.service'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './middleware/logger.middleware'
import database from './config/database'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ResponseInterceptor } from './interceptors/response.interceptor'

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [database] })],
    providers: [
        CommonService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        },
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({ transform: true, whitelist: true })
        }
    ],
    exports: [CommonService]
})
export class CommonModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('')
    }
}
