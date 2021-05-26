import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  description: string;

  @IsDateString()
  deliveryAt: string;
}
