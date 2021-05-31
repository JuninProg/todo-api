import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoDTO {
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDateString()
  deliveryAt?: string;
}
