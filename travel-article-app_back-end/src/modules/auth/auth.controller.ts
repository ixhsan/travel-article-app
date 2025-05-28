import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const user = await this.authService.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }
}
