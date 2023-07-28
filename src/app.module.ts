import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { UsuarioService } from './usuario/usuario.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';

@Module({
  imports: [PrismaModule, UsuarioModule, AuthModule],
  controllers: [],
  providers: [
    UsuarioService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
