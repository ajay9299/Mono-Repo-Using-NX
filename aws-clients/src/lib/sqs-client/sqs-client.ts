import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SqsConsumer {
  private client: SQSClient;

  constructor() {
    this.client = new SQSClient({
      region: process.env['AWS_REGION'] || 'us-east-1',
      endpoint: process.env['AWS_ENDPOINT'] || 'http://localhost:4566',
    });
  }

  async receive(queueUrl: string) {
    return this.client.send(

      new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 5,
        WaitTimeSeconds: 20,
        VisibilityTimeout:5
      }),
    );
  }


  async delete(queueUrl: string, receiptHandle: string) {
    return this.client.send(
      new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
      }),
    );
  }
}
