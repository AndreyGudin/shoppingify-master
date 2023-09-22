"use client";

import { memo, useContext } from "react";
import type { FC } from "react";

import { ShoppingListContext, ShoppingListItem } from "@/entities/ShoppingList";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

interface ShoppingListNameProps {
  className?: string;
}

export const ShoppingListName: FC<ShoppingListNameProps> = memo(
  function ShoppingListName({ className = "" }: ShoppingListNameProps) {
    const { shoppingList } = useContext(ShoppingListContext);

    return (
      <div className={`${className} px-[40px] py-[35px] bg-white mt-auto`}>
        <div className={`relative`}>
          <Input
            disabled={shoppingList.length === 0}
            placeholder='Enter a name'
            theme={shoppingList.length > 0 ? "secondary" : "disabled"}
          />
          <Button
            type='button'
            disabled={shoppingList.length === 0}
            variant={shoppingList.length > 0 ? "secondary" : "disabled"}
            className='w-[87px] h-[61px] absolute top-0 right-0'
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
);
