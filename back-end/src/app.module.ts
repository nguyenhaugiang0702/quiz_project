import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { ExamController } from './exam/exam.controller';
import { ExamModule } from './exam/exam.module';


@Module({
  imports: [AuthModule, ExamModule, PrismaModule],
  controllers: [AppController, AuthController, ExamController],
  providers: [AppService],
})
export class AppModule {}
