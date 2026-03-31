import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { PageHeader } from "../../shared/components/page-header";
import { authClient } from "./auth-state";
import { loginFormSchema, type LoginFormValues } from "./login-form-schema";

export function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@example.com",
      password: ""
    }
  });

  async function handleLogin(values: LoginFormValues) {
    setErrorMessage(null);

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? "Unable to sign in.");
        return;
      }

      await router.invalidate();
      await router.navigate({ to: "/dashboard" });
    } catch {
      setErrorMessage("Unable to sign in.");
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <PageHeader
        eyebrow="Authentication"
        title="Sign in to access the operator workspace"
        description="Use the internal email/password credentials provisioned for your account. After login, the app redirects to the dashboard."
      />
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit(handleLogin)}>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Email
            <input
              type="email"
              {...register("email")}
              className={`rounded-2xl border bg-slate-950 px-4 py-3 text-base text-white outline-none transition ${
                errors.email
                  ? "border-rose-500 focus:border-rose-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
              placeholder="admin@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email ? <p className="text-sm text-rose-300">{errors.email.message}</p> : null}
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Password
            <input
              type="password"
              {...register("password")}
              className={`rounded-2xl border bg-slate-950 px-4 py-3 text-base text-white outline-none transition ${
                errors.password
                  ? "border-rose-500 focus:border-rose-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password ? <p className="text-sm text-rose-300">{errors.password.message}</p> : null}
          </label>
          {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </section>
  );
}
