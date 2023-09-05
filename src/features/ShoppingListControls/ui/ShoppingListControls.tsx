"use client";

import { memo, useContext, useEffect } from "react";
import type { FC } from "react";
import { AddItem } from "@/widgets/AddItem";
import { ShoppingListContext } from "@/entities/ShoppingList";
import { Button } from "@/shared/ui/Button";

interface ShoppingListControlsProps {
  className?: string;
}

export const ShoppingListControls: FC<ShoppingListControlsProps> = memo(
  function ShoppingList({ className = "" }: ShoppingListControlsProps) {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

    return (
      <aside
        className={`${className} w-full flex flex-col items-center h-screen pt-[44px]`}
      >
        <AddItem />
      </aside>
    );
  }
);
