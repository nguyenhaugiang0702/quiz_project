import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamRepository } from '../exam/exam.repository';
import { CustomResponse } from '../common/exceptions/custom-response';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ExamService {
  constructor(private examRepo: ExamRepository) {}

  async create(dto: CreateExamDto) {
    console.log(dto);
    const existingExam = await this.examRepo.findExamByName(dto.title);
    if(existingExam){
      return CustomResponse.error('Kỳ thi đã tồn tại', HttpStatus.BAD_REQUEST, 'EXAM_EXISTS');
    }
    const exam = await this.examRepo.createExam(dto);  
    return CustomResponse.success('Tạo kỳ thi thành công', exam);
  }

  async findAll() {
    const exams = await this.examRepo.getAllExams();
    return CustomResponse.success('Lấy danh sách kỳ thi thành công', exams);
  }
}