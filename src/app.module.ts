import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, ProvidersModule],
})
export class AppModule {}
