import { NestFactory } from '@nestjs/core'
import { AdminModule } from './admin.module'
import { Logger, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AdminModule)

    // 路由前缀
    app.setGlobalPrefix('api')

    // 版本控制
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI
    })

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

    await app.listen(process.env.ADMIN_PORT, () => {
        Logger.log(`Server Running at http://127.0.0.1:${process.env.ADMIN_PORT}/api/v1`)
        Logger.log(`Swagger Running at http://127.0.0.1:${process.env.ADMIN_PORT}/swagger`)
    })
}
bootstrap()
