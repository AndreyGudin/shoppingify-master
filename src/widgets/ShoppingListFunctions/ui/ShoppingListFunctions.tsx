import { ShoppingListCompleteCancel } from "@/features/ShoppingListCompleteCancel";
import { ShoppingListName } from "@/features/ShoppingListName";
import { memo } from "react";
import type { FC } from "react";

interface ShoppingListFunctionsProps {
  save: boolean;
}

export const ShoppingListFunctions: FC<ShoppingListFunctionsProps> = memo(
  function ShoppingListFunctions({ save = true }: ShoppingListFunctionsProps) {
    return <>{save ? <ShoppingListName /> : <ShoppingListCompleteCancel />}</>;
  }
);
