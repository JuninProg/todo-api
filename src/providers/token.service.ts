import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const DEFAULT_JWT_ALGORITHM = 'HS256';
const DEFAULT_JWT_EXPIRES_TIME_IN_MS = 86400000;
const DEFAULT_JWT_SECRET = 'somesecret';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || DEFAULT_JWT_ALGORITHM;
const JWT_EXPIRES_TIME_IN_MS = process.env.JWT_EXPIRES_TIME_IN_MS
  ? parseInt(process.env.JWT_EXPIRES_TIME_IN_MS)
  : DEFAULT_JWT_EXPIRES_TIME_IN_MS;

@Injectable()
export class TokenService {
  signToken(
    payload: Record<string, unknown>,
    expiresInMs?: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn: expiresInMs || JWT_EXPIRES_TIME_IN_MS,
          algorithm: JWT_ALGORITHM as jwt.Algorithm,
        },
        (err, encoded) => {
          if (err) reject(err);
          else resolve(encoded as string);
        }
      );
    });
  }

  decodeToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        JWT_SECRET,
        { algorithms: [JWT_ALGORITHM as jwt.Algorithm] },
        (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        }
      );
    });
  }
}
