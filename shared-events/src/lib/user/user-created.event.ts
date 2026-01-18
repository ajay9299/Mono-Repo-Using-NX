export interface UserCreatedEvent {
  type: 'USER_CREATED';
  eventId: string;
  occurredAt: string;
  payload: {
    userId: string;
    email: string;
  };
}
