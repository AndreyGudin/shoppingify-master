import { memo } from "react";
import type { FC } from "react";

interface CounterTextProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

export const CounterText: FC<CounterTextProps> = memo(function CounterText({
  text,
  onClick = () => {},
  className = "",
}: CounterTextProps) {
  return (
    <span
      onClick={onClick}
      className={`${className} block w-[68px] h-[32px] text-center border-2 rounded-2xl text-secondary border-secondary leading-[28px] cursor-pointer`}
    >
      {text}
    </span>
  );
});
