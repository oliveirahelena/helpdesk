import type { ZodTypeAny } from "zod";

function buildLooseJsonSchema(schema: ZodTypeAny) {
  return {
    type: "object",
    description: `Placeholder JSON schema generated for ${schema.description ?? "contract"}`
  };
}

export function toBodySchema(schema: ZodTypeAny) {
  return buildLooseJsonSchema(schema);
}

export function toQuerySchema(schema: ZodTypeAny) {
  return buildLooseJsonSchema(schema);
}

export function toParamsSchema(schema: ZodTypeAny) {
  return buildLooseJsonSchema(schema);
}

export function toResponseSchema(schema: ZodTypeAny) {
  return buildLooseJsonSchema(schema);
}
