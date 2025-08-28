import { IsEmail, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateExamDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsInt() 
  duration: number; 
}