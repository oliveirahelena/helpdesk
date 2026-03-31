import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({
    error: "Enter a valid email address."
  }),
  password: z
    .string({
      error: "Enter your password."
    })
    .min(1, {
      error: "Enter your password."
    })
});

export type LoginFormValues = z.input<typeof loginFormSchema>;
