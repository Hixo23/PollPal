"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
