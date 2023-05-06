import { Module } from '@nestjs/common'
import { AuthsService } from './auths.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../users/users.module'
import { AuthsController } from './auths.controller'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.ADMIN_SECRET,
            signOptions: { expiresIn: '1d' }
        }),
        UsersModule
    ],
    controllers: [AuthsController],
    providers: [AuthsService, JwtStrategy, LocalStrategy]
})
export class AuthsModule {}
