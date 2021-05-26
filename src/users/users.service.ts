import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../providers/hash.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.entity';

const ADMIN_USER_EMAIL = process.env.ADMIN_USER_EMAIL as string;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService
  ) {}

  async create(data: CreateUserDTO): Promise<Pick<User, 'id'>> {
    const userFound = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (userFound || data.email === ADMIN_USER_EMAIL)
      throw new HttpException(
        `Email in use by another user: ${data.email}`,
        HttpStatus.BAD_REQUEST
      );

    const passwordHash = await this.hashService.genHash(data.password);

    const {
      identifiers: [identifier],
    } = await this.usersRepository.insert({
      email: data.email,
      password: passwordHash,
    });

    return { id: identifier.id };
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.usersRepository.findOne({ where: { email } });

    return userFound ? userFound : null;
  }

  async findById(id: number): Promise<User | null> {
    const userFound = await this.usersRepository.findOne({ where: { id } });

    return userFound ? userFound : null;
  }
}
