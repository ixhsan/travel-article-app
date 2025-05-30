import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SuccessMessage('Register Success')
  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  @SuccessMessage('Login Success')
  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const user = await this.authService.validateUser(dto);
    if (!user)
      throw new UnauthorizedException(
        'Either user not found or wrong password',
      );
    return this.authService.login(user);
  }
}
