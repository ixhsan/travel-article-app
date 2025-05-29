import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import {
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './auth.dto';
import { toDto } from 'src/shared/utils/to-dto.utils';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: { email: string; password: string }) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    }
    return null;
  }

  login(user: Omit<User, 'password'>): LoginResponseDto {
    const payload = { sub: user.id, email: user.email };

    return toDto(LoginResponseDto, {
      ...user,
      access_token: this.jwtService.sign(payload),
    });
  }

  async register(dto: RegisterRequestDto) {
    const exist = await this.userService.findByEmail(dto.email);
    if (exist) throw new BadRequestException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const result = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return toDto(RegisterResponseDto, result);
  }
}
