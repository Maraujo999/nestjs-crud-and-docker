import { Request } from 'express';
import { UsuarioEntity } from 'src/usuario/entity/usuarioEntity';

export interface AuthRequest extends Request {
  user: UsuarioEntity;
}
