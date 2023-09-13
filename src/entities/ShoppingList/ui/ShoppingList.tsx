import Image from "next/image";
import { memo } from "react";
import type { FC } from "react";

import ShoppingImage from "p/shopping.svg";

interface ShoppingListProps {
  className?: string;
}

export const ShoppingList: FC<ShoppingListProps> = memo(function ShoppingList({
  className = "",
}: ShoppingListProps) {
  return (
    <div className={`${className} flex flex-col h-full`}>
      <Image
        className='self-end'
        src={ShoppingImage}
        alt='shopping'
        width={245}
      />
    </div>
  );
});
