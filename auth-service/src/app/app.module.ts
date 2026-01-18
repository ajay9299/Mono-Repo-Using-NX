import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsService } from './sns/sns.service';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'auth-service/.env', // IMPORTANT in Nx monorepo
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SnsService],
})
export class AppModule {}
