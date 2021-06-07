import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './components/auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { Todo } from './components/todo/todo.entity';
import { TodoModule } from './components/todo/todo.module';
import { User } from './components/users/users.entity';
import { UsersModule } from './components/users/users.module';

const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_DB_PORT = 3306;
const DEFAULT_DB_PASS = '1234';
const DEFAULT_DB_NAME = 'todo_db';
const DEFAULT_DB_USER = 'root';

const DB_HOST = process.env.DB_HOST || DEFAULT_DB_HOST;
const DB_PORT = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT)
  : DEFAULT_DB_PORT;
const DB_PASS = process.env.DB_PASS || DEFAULT_DB_PASS;
const DB_NAME = process.env.DB_NAME || DEFAULT_DB_NAME;
const DB_USER = process.env.DB_USER || DEFAULT_DB_USER;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [User, Todo],
    }),
    AuthModule,
    UsersModule,
    ProvidersModule,
    TodoModule,
  ],
})
export class AppModule {}
