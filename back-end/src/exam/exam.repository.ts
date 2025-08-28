import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamRepository {
  constructor(private prisma: PrismaService) {}

  async findExamByName(title : string) {
    return this.prisma.exam.findFirst({ where: { title } });
  }

  async getAllExams() {
    return this.prisma.exam.findMany();
  }

  async createExam(dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        title: dto.title,
        description: dto.description,
        duration: dto.duration,
      },
    });
  }
}
