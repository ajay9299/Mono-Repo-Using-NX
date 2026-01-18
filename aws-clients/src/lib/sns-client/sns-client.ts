import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

export class SnsPublisher {
  private client: SNSClient;

  constructor() {
    this.client = new SNSClient({
      region: process.env['AWS_REGION'] || 'us-east-1',
      endpoint: process.env['AWS_ENDPOINT'], // only set in local
    });
  }

  async publish(topicArn: string, message: any, options?: {
    groupId?: string;
    dedupId?: string;
  }) {
    const command = new PublishCommand({
      TopicArn: topicArn,
      Message: JSON.stringify(message),

      // FIFO SUPPORT
      MessageGroupId: options?.groupId,
      MessageDeduplicationId: options?.dedupId,
    });

    return this.client.send(command);
  }
}
