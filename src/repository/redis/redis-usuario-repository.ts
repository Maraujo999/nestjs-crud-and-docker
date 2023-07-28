import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';

import { UsuarioEntity } from 'src/usuario/entity/usuarioEntity';
import { PrismaService } from 'src/config/prisma';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { CacheUsuarioRepository } from './cache-usuario-repository';

@Injectable()
export class RedisUserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async create(key: string, value: any, exp?: number) {
    const stringValue = JSON.stringify(value);
    await this.redis.set(key, stringValue, 'EX', exp);
  }

  async findMany() {
    const cacheUsers = await this.redis.get('usuario');

    if (!cacheUsers) {
      const users = await this.usuarioRepository.listar();

      await this.redis.set('users', JSON.stringify(users), 'EX', 15);

      console.log('\x1b[33m%s\x1b[0m', 'From Database');
      return users;
    }

    console.log('\x1b[36m%s\x1b[0m', 'From Cache');
    return JSON.parse(cacheUsers);
  }
}
