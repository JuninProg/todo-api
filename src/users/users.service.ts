import { Injectable } from '@nestjs/common';
import { HashService } from '../providers/hash.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly hashService: HashService) {}

  private users: IUser[] = [];

  async create(data: CreateUserDTO): Promise<IUser> {
    const id = Math.floor(Math.random() * 1000000);
    const newUser: IUser = {
      id,
      email: data.email,
      password: await this.hashService.genHash(data.password),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const userFound = this.users.find((user) => user.email === email);

    return userFound ? userFound : null;
  }

  async findById(id: number): Promise<IUser | null> {
    const userFound = this.users.find((user) => user.id === id);

    return userFound ? userFound : null;
  }
}
