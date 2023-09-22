"use client";

import { memo, useCallback, useRef, useState } from "react";
import type { FC } from "react";

import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Trash } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { CounterText } from "../CounterText/CounterText";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

interface CounterProps {
  className?: string;
  count?: number;
  plus?: () => void;
  minus?: () => void;
  deleteItem?: () => void;
}

export const Counter: FC<CounterProps> = memo(function Counter({
  className = "",
  count = 1,
  plus = () => {},
  minus = () => {},
  deleteItem = () => {},
}: CounterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeCounter = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { isComponentVisible, ref, setIsComponentVisible } = useClickOutside({
    isVisible: true,
    callback: closeCounter,
  });
  const handleClick = useCallback(() => {
    setIsOpen(true);
    setIsComponentVisible(true);
  }, [setIsComponentVisible]);

  if (!isOpen || !isComponentVisible)
    return <CounterText onClick={handleClick} text={count.toString(10)} />;
  return (
    <div
      ref={ref}
      className={`${className} w-[174px] h-[45px] flex items-center bg-primary rounded-xl`}
    >
      <Button
        variant={"secondary"}
        size={"outline"}
        className='w-[37px] h-full bg-secondary'
        onClick={deleteItem}
      >
        <Trash className='stroke-white' width={24} height={24} />
      </Button>
      <div className='flex gap-1 flex-grow justify-center items-center'>
        <Button onClick={minus} variant={"outline"} size={"icon"}>
          <Minus className='stroke-secondary hover:stroke-secondary/80' />
        </Button>
        <CounterText text={`${count.toString(10)} pcs`} />
        <Button onClick={plus} variant={"outline"} size={"icon"}>
          <Plus className='stroke-secondary hover:stroke-secondary/80' />
        </Button>
      </div>
    </div>
  );
});
