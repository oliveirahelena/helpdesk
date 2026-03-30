import { z } from "zod";

const queuePayloadSchema = z.record(z.string(), z.unknown());

export const queuePayloadMapSchema = z.object({
  "inbox-email": queuePayloadSchema,
  "classify-ticket": queuePayloadSchema,
  "auto-resolve": queuePayloadSchema,
  "send-reply": queuePayloadSchema,
  "sync-sendgrid-events": queuePayloadSchema
});

export type QueuePayloadMap = z.infer<typeof queuePayloadMapSchema>;
