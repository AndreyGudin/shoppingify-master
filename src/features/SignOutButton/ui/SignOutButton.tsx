"use client";

import { memo } from "react";
import type { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  className?: string;
}

export const SignOutButton: FC<SignOutButtonProps> = memo(
  function SignOutButton({ className = "" }: SignOutButtonProps) {
    return (
      <Button variant={"default"} onClick={() => signOut()}>
        Sign Out
      </Button>
    );
  }
);
