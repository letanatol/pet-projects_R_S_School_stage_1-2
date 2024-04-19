const MAX_NUMBER = 1000000;

export function generateMessageId(): string {
  const randomValue: number = Math.floor(Math.random() * MAX_NUMBER);
  const timestamp: string = new Date().getTime().toString();
  const messageId: string = `${timestamp}_${randomValue}`;
  return messageId;
}
