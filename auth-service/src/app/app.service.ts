import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '@org/shared-events';

import { SnsPublisher } from '@org/aws-clients'
 
@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {

    const event: UserCreatedEvent = {
      type: 'USER_CREATED',
      eventId: 'evt_12345',
      occurredAt: new Date().toISOString(),
      payload: {
        userId: 'user_67890',
        email: 'email@gmail.com',
      },
    }
    const publisher = new SnsPublisher();
    await publisher.publish(process.env.USER_EVENTS_TOPIC_ARN!, event, {
      groupId: 'user-events-group',
      dedupId: event.eventId,
    });
     
    return { message: 'Hello API' };
  }
};
