import { IsEmail, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsInt() 
  duration: number; 
}