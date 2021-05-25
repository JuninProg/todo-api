import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { HashService } from '../providers/hash.service';
import { IAccessToken } from './interfaces/access-token.interface';
import { TokenService } from '../providers/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async signIn(data: LoginDTO): Promise<IAccessToken> {
    const userFound = await this.usersService.findByEmail(data.email);
    if (
      userFound &&
      (await this.hashService.compareHash(data.password, userFound.password))
    ) {
      return {
        token: await this.tokenService.signToken({
          id: userFound.id,
          email: userFound.email,
        }),
      };
    } else {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
