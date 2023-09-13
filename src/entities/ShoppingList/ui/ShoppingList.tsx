import Image from "next/image";
import { memo, useContext } from "react";
import type { FC } from "react";

import ShoppingImage from "p/shopping.svg";
import { Label } from "@/shared/ui/Label";
import { ShoppingListContext } from "../model/context/ShoppingListContext";
import { Input } from "@/shared/ui/Input";

interface ShoppingListProps {
  className?: string;
}

export const ShoppingList: FC<ShoppingListProps> = memo(function ShoppingList({
  className = "",
}: ShoppingListProps) {
  const { shoppingList } = useContext(ShoppingListContext);

  const noItems = (
    <div className={`${className} flex flex-col h-full justify-center`}>
      <Label className='mt-auto' type={"medium"} sort={"center"}>
        No items
      </Label>
      <Image
        className='mt-auto'
        src={ShoppingImage}
        alt='shopping'
        width={245}
      />
    </div>
  );

  if (shoppingList.length === 0) return noItems;

  return <Input />;
});
