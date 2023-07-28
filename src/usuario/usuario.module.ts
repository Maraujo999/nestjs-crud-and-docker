import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { Module, CacheModule } from '@nestjs/common';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { AlunoController } from './aluno';
import { EmailUniqueValidator } from './validation/email-unique.validator';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/config/prisma';
import { PrismaUsuarioRepository } from 'src/repository/prisma/prisma-usuario-repository';
import { RedisModule, RedisService } from 'nestjs-redis';
import {
  CacheUsuarioRepository,
  MainUserRepository,
} from 'src/repository/redis/cache-usuario-repository';
import { RedisCacheService } from 'src/redis-cache/redis-service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), PrismaModule],
  controllers: [UsuarioController, AlunoController],
  providers: [
    UsuarioRepository,
    EmailUniqueValidator,
    UsuarioService,
    PrismaService,
    RedisCacheService,
    UsuarioService,
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
