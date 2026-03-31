import { createAuthClient } from "better-auth/react";

import { webEnv } from "../../shared/lib/env";

export const authClient = createAuthClient({
  baseURL: webEnv.VITE_API_BASE_URL,
  fetchOptions: {
    credentials: "include"
  }
});

export type AuthSession = typeof authClient.$Infer.Session;
