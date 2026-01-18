import { Injectable } from '@nestjs/common';
import { SnsPublisher } from '@org/aws-clients';

@Injectable()
export class SnsService {
  private sns = new SnsPublisher(process.env.AWS_REGION);

  async userCreated(event: any) {
    await this.sns.publish(
      process.env.AUTH_EVENTS_TOPIC_ARN || '',
      event,
    );
  }
}
