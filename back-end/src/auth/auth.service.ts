import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from '../auth/auth.repository';
import { CustomResponse } from '../common/exceptions/custom-response';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private authRepo: AuthRepository, private jwtService: JwtService) {}

  // Đăng ký người dùng   
  async signup(dto: SignupDto) {
    const existingUser = await this.authRepo.findUserByEmail(dto.email);
    if (existingUser) {
      return CustomResponse.error('Email đã tồn tại', HttpStatus.BAD_REQUEST, 'EMAIL_EXISTS');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepo.createUser(dto, hashedPassword);
    return CustomResponse.success('Đăng ký thành công', { userId: user.id });
  }

  // Đăng nhập người dùng
  async login(dto: LoginDto) {
    const user = await this.authRepo.findUserByEmail(dto.email);
    if (!user) return CustomResponse.error('Sai email hoặc mật khẩu', HttpStatus.UNAUTHORIZED, 'INVALID_CREDENTIALS');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) return CustomResponse.error('Sai email hoặc mật khẩu', HttpStatus.UNAUTHORIZED, 'INVALID_CREDENTIALS');

    const payload = { sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return CustomResponse.success('Đăng nhập thành công', { access_token: token });
  }
}
