import type { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { fromNodeHeaders } from "better-auth/node";

import { createAuth } from "../../platform/auth/auth";

type AuthSession = NonNullable<
  Awaited<ReturnType<ReturnType<typeof createAuth>["api"]["getSession"]>>
>;

declare module "fastify" {
  interface FastifyInstance {
    auth: ReturnType<typeof createAuth>;
    requireAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    authSession: AuthSession | null;
  }
}

export const authPlugin = fp(async (app) => {
  const auth = createAuth(app.appEnv, app.db);

  app.decorate("auth", auth);
  app.decorateRequest("authSession", null);
  app.decorate("requireAuth", async (request, reply) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers)
    });

    if (!session) {
      await reply.status(401).send({
        error: "Unauthorized"
      });
      return;
    }

    request.authSession = session;
  });

  app.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    async handler(request, reply) {
      const url = new URL(request.url, app.appEnv.BETTER_AUTH_URL);
      const headers = fromNodeHeaders(request.headers);
      const body =
        request.body === undefined || request.body === null ? undefined : JSON.stringify(request.body);

      const authRequest = new Request(url.toString(), {
        method: request.method,
        headers,
        body
      });

      const response = await auth.handler(authRequest);

      reply.status(response.status);
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      const responseBody = await response.text();

      if (!responseBody) {
        return reply.send();
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        return reply.send(JSON.parse(responseBody));
      }

      return reply.send(responseBody);
    }
  });
});
