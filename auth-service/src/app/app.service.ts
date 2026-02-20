import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '@org/shared-events';
import { redisClient } from '@org/shared-redis';
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

    redisClient.set(`user:${event.payload.userId}`, JSON.stringify(event.payload), 'EX', 3600);

    console.log('Published event to Redis:', event);
    // const publisher = new SnsPublisher();
    // await publisher.publish(process.env.USER_EVENTS_TOPIC_ARN!, event, {
    //   groupId: 'user-events-group',
    //   dedupId: event.eventId,
    // });
     
    return { message: 'Hello API' };
  }
};
