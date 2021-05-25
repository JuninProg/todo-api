import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO
  ): Promise<Pick<IUser, 'id'>> {
    const createdUser = await this.usersService.create(createUserDTO);
    return { id: createdUser.id };
  }
}
