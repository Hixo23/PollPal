"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import "@radix-ui/themes/styles.css";

const queryClient = new QueryClient();

const TOAST_DURATION_IN_SECONDS = 5 * 1000;

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster duration={TOAST_DURATION_IN_SECONDS} theme="dark" />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
