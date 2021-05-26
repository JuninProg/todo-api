import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { IAccessToken } from './interfaces/access-token.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDTO: LoginDTO): Promise<IAccessToken> {
    return this.authService.signIn(loginDTO);
  }
}
