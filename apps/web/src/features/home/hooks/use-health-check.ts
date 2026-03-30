import { useQuery } from "@tanstack/react-query";

import { getHealthCheck } from "../api/get-health-check";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health-check"],
    queryFn: getHealthCheck
  });
}
