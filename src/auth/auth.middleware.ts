import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../providers/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (authorization && authorization.split('Bearer ')[1]) {
      const token = authorization.split('Bearer ')[1];
      const decoded = await this.tokenService.decodeToken(token);
      const user = await this.usersService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = {
        id: user.id,
        email: user.email,
      };
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
