import { placeholderTicketSchema } from "@helpdesk/contracts";

export async function listTickets() {
  return [
    placeholderTicketSchema.parse({
      id: "placeholder-1",
      subject: "Phase 1 placeholder ticket",
      status: "open"
    })
  ];
}
