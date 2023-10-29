"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" />
      <Theme accentColor="orange" panelBackground="solid" appearance="dark">
        <SessionProvider>{children}</SessionProvider>
      </Theme>
    </QueryClientProvider>
  );
};
