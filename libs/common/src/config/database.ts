import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
    type: 'mysql',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PWD,
    database: process.env.SQL_DATABASE,
    // entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],//建议关闭 使用如下
    autoLoadEntities: true, //自动加载实体 forFeature方法注册的实体都将自动添加
    synchronize: process.env.MODE === 'dev' ? true : false, //通过环境变量控制，生产环境为false
    bigNumberStrings: false,
    timezone: 'local',
    charser: 'utf8mb4'
}))
