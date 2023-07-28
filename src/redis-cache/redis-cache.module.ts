import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
//import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { RedisCacheService } from './redis-service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      extraProviders: [],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_USERNAME'),
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: configService.get('REDIS_TTL'),
      }),
    }),
  ],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
