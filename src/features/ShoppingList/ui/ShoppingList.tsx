import { memo } from "react";
import type { FC } from "react";
import { AddItem } from "@/widgets/AddItem";

interface ShoppingListProps {
  className?: string;
}

export const ShoppingList: FC<ShoppingListProps> = memo(function ShoppingList({
  className = "",
}: ShoppingListProps) {
  return (
    <aside
      className={`${className} w-full flex flex-col items-center h-screen pt-[44px]`}
    >
      <AddItem />
    </aside>
  );
});
