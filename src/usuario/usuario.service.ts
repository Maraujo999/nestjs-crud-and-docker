import { CriaUsuarioDto } from './dto/criaUsuarioDto';
import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './entity/usuarioEntity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CriaUsuarioDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.usuario.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
