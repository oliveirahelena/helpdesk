export interface TicketViewModel {
  id: string;
  subject: string;
  status: "open" | "resolved" | "closed";
}
