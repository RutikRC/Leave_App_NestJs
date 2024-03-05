import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LeaveModule } from './leave/leave.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger.middleware';
import { StatusService } from './status/leave-status.service';
import { StatusController } from './status/leave-status.controller';
import { LeaveStatusModule } from './status/leave-status.module';
import { MemoService } from './memo/memo.service';
import { MemoController } from './memo/memo.controller';
import { MemoModule } from './memo/memo.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    LeaveModule,
    AuthModule,
    UsersModule,
    LeaveStatusModule,
    MemoModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('Leave');
  }}
