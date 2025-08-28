import { Body, Controller, Post, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @Post()
    create(@Body() dto: CreateExamDto) {
        return this.examService.create(dto);
    }

    @Get()
    findAll() {
        return this.examService.findAll();
    }
}