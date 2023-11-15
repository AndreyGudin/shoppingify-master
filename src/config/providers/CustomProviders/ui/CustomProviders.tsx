"use client";

import { SessionProvider } from "next-auth/react";

type CustomProvidersProps = {
  children?: React.ReactNode;
};

export const CustomProviders = ({ children }: CustomProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
