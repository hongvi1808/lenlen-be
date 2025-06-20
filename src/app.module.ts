import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './configs/middlewares/logger.middleware';
import { AuthMiddleware } from './configs/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(5678),
        NODE_ENV: Joi.string().valid('local', 'test', 'production').default('local'),
        GLOBAL_API_PREFIX: Joi.string().default('api')
      })
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5min
      max: 100,
      // stores: 'redis',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes('*/')
  }
}
