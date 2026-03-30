import type { PlaceholderTicketDto } from "@helpdesk/contracts";

import type { TicketViewModel } from "../schemas/ticket-view";

export function mapTicket(ticket: PlaceholderTicketDto): TicketViewModel {
  return ticket;
}
