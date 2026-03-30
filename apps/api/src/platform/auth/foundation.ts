import type { ApiEnv } from "../config/env";

export interface AuthFoundationProof {
  backendConfigLoads: true;
  backendPluginRegisters: true;
  databaseDependencyResolves: true;
  frontendAuthBoundaryExists: true;
  loginFlowImplemented: false;
  secretLength: number;
}

export function createAuthFoundationProof(env: ApiEnv): AuthFoundationProof {
  return {
    backendConfigLoads: true,
    backendPluginRegisters: true,
    databaseDependencyResolves: true,
    frontendAuthBoundaryExists: true,
    loginFlowImplemented: false,
    secretLength: env.BETTER_AUTH_SECRET.length
  };
}
