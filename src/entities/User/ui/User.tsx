"use client";

import { useSession } from "next-auth/react";
import { memo } from "react";
import type { FC } from "react";

interface UserProps {
  className?: string;
}

export const User: FC<UserProps> = memo(function User({
  className = "",
}: UserProps) {
  const { data: session } = useSession();
  return (
    <div className={`${className}`}>
      {" "}
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
});
