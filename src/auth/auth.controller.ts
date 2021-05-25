import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { IAccessToken } from './interfaces/access-token.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDTO): Promise<IAccessToken> {
    return this.authService.signIn(data);
  }
}
