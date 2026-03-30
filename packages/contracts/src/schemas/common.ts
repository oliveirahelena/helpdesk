import { z } from "zod";

export const timestampSchema = z.string().datetime();
export const identifierSchema = z.string().min(1);
