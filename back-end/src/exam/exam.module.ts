import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';

@Module({
  imports: [],
  controllers: [ExamController],
  providers: [ExamService, ExamRepository],
  exports: [ExamService], 
})
export class ExamModule {}