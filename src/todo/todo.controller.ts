import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ListTodosDTO } from './dto/list-todos.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { IListTodo } from './interfaces/list-todos.interface';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body() createTodoDTO: CreateTodoDTO,
    @Req() request: Request
  ): Promise<Pick<Todo, 'id'>> {
    return this.todoService.create(
      createTodoDTO,
      request.user.id,
      request.user.role
    );
  }

  @Post('/:id/complete')
  @HttpCode(HttpStatus.OK)
  complete(
    @Param('id', ParseIntPipe) todoId: number,
    @Req() request: Request
  ): Promise<Todo> {
    return this.todoService.completeTodo(
      todoId,
      request.user.id,
      request.user.role
    );
  }

  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) todoId: number,
    @Body() updateTodoDTO: UpdateTodoDTO,
    @Req() request: Request
  ): Promise<Todo> {
    return this.todoService.updateTodo(
      todoId,
      updateTodoDTO,
      request.user.id,
      request.user.role
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listTodos(
    @Req() request: Request,
    @Query() listTodosDTO: ListTodosDTO
  ): Promise<{ todos: IListTodo[] }> {
    return this.todoService.listTodos(
      request.user.id,
      request.user.role,
      listTodosDTO
    );
  }
}
