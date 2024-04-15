"use client";

import { memo } from "react";
import type { FC } from "react";

import { useShoppingList } from "@/entities/ShoppingListComponent";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

interface ShoppingListNameProps {
  className?: string;
}

export const ShoppingListName: FC<ShoppingListNameProps> = memo(
  function ShoppingListName({ className = "" }: ShoppingListNameProps) {
    const shoppingList = useShoppingList((state) => state.shoppingList);

    return (
      <div className={`${className} px-[40px] py-[35px] bg-white mt-auto`}>
        <div className={`relative`}>
          <Input
            disabled={shoppingList.size === 0}
            placeholder='Enter a name'
            theme={shoppingList.size > 0 ? "secondary" : "disabled"}
          />
          <Button
            type='button'
            disabled={shoppingList.size === 0}
            variant={shoppingList.size > 0 ? "secondary" : "disabled"}
            className='w-[87px] h-[61px] absolute top-0 right-0'
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
);
