"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster duration={5 * 1000} theme="dark" />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
