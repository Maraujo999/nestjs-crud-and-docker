import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { UsuarioEntity } from 'src/usuario/entity/usuarioEntity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
