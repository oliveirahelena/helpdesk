import { useQuery } from "@tanstack/react-query";

import { listTickets } from "../api/list-tickets";

export function useTicketList() {
  return useQuery({
    queryKey: ["tickets", "placeholder"],
    queryFn: listTickets
  });
}
