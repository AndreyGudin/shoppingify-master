"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

type CustomProvidersProps = {
  children?: React.ReactNode;
};
const queryClient = new QueryClient();

export const CustomProviders = ({ children }: CustomProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
