import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoles } from '../auth/interfaces/token-payload.interface';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ListTodosDTO } from './dto/list-todos.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { IListTodo } from './interfaces/list-todos.interface';
import { Todo } from './todo.entity';

const DELIVERY_AT_DIFF_TIME = 0;

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly usersService: UsersService
  ) {}

  async create(
    data: CreateTodoDTO,
    userId: number | null,
    userRole: IRoles
  ): Promise<Pick<Todo, 'id'>> {
    if (userId === null && userRole === IRoles['admin'])
      throw new HttpException(
        `Admin user cannot create todo.`,
        HttpStatus.BAD_REQUEST
      );

    const userFound = await this.usersService.findById(userId as number);

    if (!userFound)
      throw new HttpException(
        `User not found by id: ${userId}.`,
        HttpStatus.BAD_REQUEST
      );

    const deliveryAt = new Date(data.deliveryAt);
    const diff = deliveryAt.getTime() - Date.now();

    if (diff < DELIVERY_AT_DIFF_TIME)
      throw new HttpException(
        `Devilery date must be equal or greater than today: ${data.deliveryAt}.`,
        HttpStatus.BAD_REQUEST
      );

    const createdAt = new Date();

    const {
      identifiers: [identifier],
    } = await this.todoRepository.insert({
      user: userFound,
      description: data.description,
      deliveryAt,
      completedAt: null,
      updatedAt: null,
      createdAt,
    });

    return { id: identifier.id };
  }

  async completeTodo(
    todoId: number,
    userId: number | null,
    userRole: IRoles
  ): Promise<Todo> {
    if (userId === null && userRole === IRoles['admin'])
      throw new HttpException(
        `Admin user cannot complete todo.`,
        HttpStatus.BAD_REQUEST
      );

    const todoFound = await this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todoFound)
      throw new HttpException(
        `Todo not found: ${todoId}.`,
        HttpStatus.NOT_FOUND
      );

    if (todoFound.completedAt)
      throw new HttpException(
        `Todo is already completed.`,
        HttpStatus.BAD_REQUEST
      );

    const completedAt = new Date();

    await this.todoRepository.update({ id: todoFound.id }, { completedAt });

    todoFound.completedAt = completedAt;

    return todoFound;
  }

  async updateTodo(
    todoId: number,
    data: UpdateTodoDTO,
    userId: number | null,
    userRole: IRoles
  ): Promise<Todo> {
    if (userId === null && userRole === IRoles['admin'])
      throw new HttpException(
        `Admin user cannot update todo.`,
        HttpStatus.BAD_REQUEST
      );

    if (!data.deliveryAt && !data.description)
      throw new HttpException(
        `Payload should not be empty.`,
        HttpStatus.BAD_REQUEST
      );

    const todoFound = await this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todoFound)
      throw new HttpException(
        `Todo not found: ${todoId}.`,
        HttpStatus.NOT_FOUND
      );

    if (todoFound.completedAt)
      throw new HttpException(
        `Todo is already completed.`,
        HttpStatus.BAD_REQUEST
      );

    let deliveryAt;

    if (data.deliveryAt) {
      deliveryAt = new Date(data.deliveryAt);
      const diff = deliveryAt.getTime() - Date.now();

      if (diff < DELIVERY_AT_DIFF_TIME)
        throw new HttpException(
          `Devilery date must be equal or greater than today: ${data.deliveryAt}.`,
          HttpStatus.BAD_REQUEST
        );
    }

    const description = data.description || todoFound.description;
    deliveryAt = deliveryAt || todoFound.deliveryAt;
    const updatedAt = new Date();

    await this.todoRepository.update(
      { id: todoFound.id },
      { description, deliveryAt, updatedAt }
    );

    todoFound.description = description;
    todoFound.deliveryAt = deliveryAt;
    todoFound.updatedAt = updatedAt;

    return todoFound;
  }

  async listTodos(
    userId: number | null,
    userRole: IRoles,
    data: ListTodosDTO
  ): Promise<{ todos: IListTodo[] }> {
    if (data.afterId && !data.limit)
      throw new HttpException(
        `When afterId is defined, limit must be defined.`,
        HttpStatus.BAD_REQUEST
      );

    if (data.limit && !data.afterId)
      throw new HttpException(
        `When limit is defined, afterId must be defined.`,
        HttpStatus.BAD_REQUEST
      );

    if (userRole === IRoles['user'] && !userId)
      throw new HttpException(`Invalid user.`, HttpStatus.BAD_REQUEST);

    const selectTodosQuery = this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect(User, 'user');

    if (userRole === IRoles['user'])
      selectTodosQuery.where('user.id = :userId', { userId });

    if (data.afterId && data.limit)
      selectTodosQuery
        .andWhere('todo.id > :afterId', {
          afterId: data.afterId,
        })
        .limit(data.limit);

    const results = await selectTodosQuery.execute();
    const now = Date.now();

    const todos = results.map(
      (result: any): IListTodo => ({
        id: result.todo_id,
        description: result.todo_description,
        deliveryAt: result.todo_delivery_at,
        completedAt: result.todo_completed_at,
        createdAt: result.todo_created_at,
        updatedAt: result.todo_updated_at,
        userId: result.todo_user_id,
        userEmail: result.user_email,
        isLate: new Date(result.todo_delivery_at).getTime() < now,
      })
    );

    return {
      todos,
    };
  }
}
