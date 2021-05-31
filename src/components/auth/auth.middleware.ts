import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction, request } from 'express';
import { TokenService } from '../../providers/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const TOKEN_POSITION = 1;
      const TOKEN_SPLIT = 'Bearer ';

      const authorization = req.headers.authorization;
      const token = authorization?.split(TOKEN_SPLIT)[TOKEN_POSITION];

      if (!token) throw new Error('Token not provided.');

      const decoded = await this.tokenService.decodeToken(token);

      request.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
      next();
    } catch (error) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
