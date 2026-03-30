import { z } from "zod";

import { timestampSchema } from "../schemas/common";

export const healthCheckResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("api"),
  timestamp: timestampSchema
});

export type HealthCheckDto = z.infer<typeof healthCheckResponseSchema>;
