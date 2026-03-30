import { healthCheckResponseSchema } from "@helpdesk/contracts/api/health";

import { webEnv } from "../../../shared/lib/env";

export async function getHealthCheck() {
  const response = await fetch(`${webEnv.VITE_API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Failed to load API health status.");
  }

  const payload: unknown = await response.json();

  return healthCheckResponseSchema.parse(payload);
}
