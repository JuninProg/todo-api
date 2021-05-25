import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

const DEFAULT_HASH_SALT_ROUNDS = 12;

const HASH_SALT_ROUNDS = process.env.HASH_SALT_ROUNDS
  ? parseInt(process.env.HASH_SALT_ROUNDS)
  : DEFAULT_HASH_SALT_ROUNDS;

@Injectable()
export class HashService {
  genHash(value: string): Promise<string> {
    return bcrypt.hash(value, HASH_SALT_ROUNDS);
  }

  compareHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
