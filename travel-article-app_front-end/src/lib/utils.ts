import type { QueryKey } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { queryClient } from "./query-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// react-query helper
type SuccessHandlerOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData extends { message?: string; data?: any },
  TVariables = unknown,
  TContext = unknown
> = {
  successMessage?:
    | string
    | ((data: TData, variables: TVariables, context: TContext) => string);
  invalidateQueries?:
    | QueryKey
    | QueryKey[]
    | ((data: TData, variables: TVariables) => QueryKey | QueryKey[]);
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
  disabledNotif?: boolean;
};

export function createSuccessHandler<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData extends { message?: string; data?: any },
  TVariables = unknown,
  TContext = unknown
>(
  options: SuccessHandlerOptions<TData, TVariables, TContext> = {
    disabledNotif: false,
  }
) {
  return (data: TData, variables: TVariables, context: TContext) => {
    const message = options?.successMessage
      ? typeof options.successMessage === "string"
        ? options.successMessage
        : options.successMessage(data, variables, context)
      : data.message || "Operation succeeded";

    if (!options?.disabledNotif)
      toast.success("Success", {
        description: message,
      });

    if (options?.invalidateQueries) {
      const keys =
        typeof options.invalidateQueries === "function"
          ? options.invalidateQueries(data, variables)
          : options.invalidateQueries;

      const keyArray = Array.isArray(keys) ? keys : [keys];

      keyArray.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    }

    options?.onSuccess?.(data, variables, context);
  };
}

// Simulated delay helper
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));