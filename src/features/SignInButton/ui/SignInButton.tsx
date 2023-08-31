"use client";

import { memo } from "react";
import type { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  className?: string;
}

export const SignInButton: FC<SignInButtonProps> = memo(function SignInButton({
  className = "",
}: SignInButtonProps) {
  return (
    <Button variant={"default"} onClick={() => signIn()}>
      Sign In
    </Button>
  );
});
