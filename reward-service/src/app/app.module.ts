import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsService } from './sqs/sqs.service';
import { RewardQueueConsumer } from './sqs';
import { SqsConsumer } from '@org/aws-clients';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'reward-service/.env', // IMPORTANT in Nx monorepo
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SqsService, RewardQueueConsumer, SqsConsumer],
})
export class AppModule {}
