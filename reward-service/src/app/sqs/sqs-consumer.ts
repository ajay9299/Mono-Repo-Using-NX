import { Injectable, OnModuleInit } from '@nestjs/common';
import { SqsConsumer } from '@org/aws-clients';

@Injectable()
export class RewardQueueConsumer implements OnModuleInit {
  private readonly queueUrl: string = process.env.REWARD_QUEUE_URL || '';
   
  constructor(private readonly sqs: SqsConsumer) {}

  async onModuleInit() {
    console.log('Reward SQS Consumer started...', this.queueUrl);
    this.poll();
  }

  private async poll() {
    while (true) {
      try {
        const res = await this.sqs.receive(this.queueUrl);

        if (res.Messages?.length) {
          for (const msg of res.Messages) {
            await this.handleMessage(msg);
          }
        }
      } catch (err) {
        console.error('SQS polling error', err);
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }

  private async handleMessage(message: any) {
    // 1. Parse SNS wrapper
    const snsEnvelope = JSON.parse(message.Body);
    const event = JSON.parse(snsEnvelope.Message);

    console.log('EVENT RECEIVED:', event);

    // 2. Business logic
    if (event.type === 'USER_CREATED') {
      console.log('Creating reward for:', event.payload.userId);
      // TODO: save reward in DB
    }

    // 3. Delete message after success
    await this.sqs.delete(this.queueUrl, message.ReceiptHandle);
  }
}
