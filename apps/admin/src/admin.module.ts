import { Module } from '@nestjs/common'
import { CommonModule } from '@app/common'
import { UsersModule } from './users/users.module'
import { AuthsModule } from './auths/auths.module'
import { AdminDbModule } from './admin-db/admin-db.module'

@Module({
    imports: [CommonModule, UsersModule, AuthsModule, AdminDbModule]
})
export class AdminModule {}
