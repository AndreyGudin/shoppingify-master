"use client";

import { memo, useContext, useEffect } from "react";
import type { FC } from "react";
import { ShoppingList, ShoppingListContext } from "@/entities/ShoppingList";
import { AddItem } from "@/features/AddItem";
import { Label } from "@/shared/ui/Label";
import { ShoppingListName } from "@/features/ShoppingListName";

interface ShoppingListControlsProps {
  className?: string;
}

export const ShoppingListControls: FC<ShoppingListControlsProps> = memo(
  function ShoppingListControls({ className = "" }: ShoppingListControlsProps) {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

    return (
      <aside
        className={`${className}  w-[390px] bg-[#FFF0DE] flex flex-col items-center h-screen pt-[44px] gap-11`}
      >
        <AddItem />
        <Label type={"big"}>Shopping List</Label>
        <ShoppingList />
        <ShoppingListName />
      </aside>
    );
  }
);
