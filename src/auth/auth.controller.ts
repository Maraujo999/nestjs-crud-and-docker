import { Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsuarioEntity } from 'src/usuario/entity/usuarioEntity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  //@ApiBody({ type: [AuthRequest] })
  login(@Request() req: AuthRequest) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth') // Indica que a rota requer autenticação com token Bearer
  getMe(@CurrentUser() user: UsuarioEntity) {
    return user;
  }
}
