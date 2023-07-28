import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from 'src/usuario/entity/usuarioEntity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UsuarioEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UsuarioEntity> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email address or password provided is incorrect.');
  }
}
