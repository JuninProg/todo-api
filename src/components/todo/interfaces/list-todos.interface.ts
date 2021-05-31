import { Todo } from '../todo.entity';

export interface IListTodo extends Omit<Todo, 'user'> {
  isLate: boolean;
  userEmail: string;
  userId: number;
}
