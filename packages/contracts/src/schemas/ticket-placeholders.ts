import { z } from "zod";

import { identifierSchema } from "./common";

export const ticketStatusSchema = z.enum(["open", "resolved", "closed"]);

export const placeholderTicketSchema = z.object({
  id: identifierSchema,
  subject: z.string().min(1),
  status: ticketStatusSchema
});

export type PlaceholderTicketDto = z.infer<typeof placeholderTicketSchema>;
