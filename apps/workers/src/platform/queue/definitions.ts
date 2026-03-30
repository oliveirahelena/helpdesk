export const queueDefinitions = [
  { name: "inbox-email", concurrency: 2 },
  { name: "classify-ticket", concurrency: 2 },
  { name: "auto-resolve", concurrency: 1 },
  { name: "send-reply", concurrency: 2 },
  { name: "sync-sendgrid-events", concurrency: 1 }
] as const;

export type QueueDefinition = (typeof queueDefinitions)[number];
