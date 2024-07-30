import { ShoppingListCompleteCancel } from "@/features/ShoppingListCompleteCancel";
import { ShoppingListName } from "@/features/ShoppingListName";
import { useSave } from "../model/store/useSave";
import { memo } from "react";
import type { FC } from "react";

export const ShoppingListFunctions: FC = memo(function ShoppingListFunctions() {
  const save = useSave((state) => state.save);
  return <>{save ? <ShoppingListName /> : <ShoppingListCompleteCancel />}</>;
});
