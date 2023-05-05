import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // 路由前缀
    app.setGlobalPrefix('api')

    // 版本控制
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI
    })

    // XSS
    app.use(helmet())

    // 开启跨域
    app.enableCors()

    // swagger文档
    const options = new DocumentBuilder()
        .setTitle('admin-api')
        .setDescription('后台管理系统api')
        .setVersion('1')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('swagger', app, document)

    await app.listen(process.env.SERVER_PORT, () => {
        Logger.log(`Server Running at http://localhost:${process.env.SERVER_PORT}/api/v1`)
        Logger.log(`Swagger Running at http://localhost:${process.env.SERVER_PORT}/swagger`)
    })
}
bootstrap()
