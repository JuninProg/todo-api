import { Module } from '@nestjs/common';
import { ProvidersModule } from '../../providers/providers.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, ProvidersModule],
})
export class AuthModule {}
