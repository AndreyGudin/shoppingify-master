"use client";

import { useCallback, useState, type FC } from "react";
import { AddItem } from "@/features/AddItem";
import { Label } from "@/shared/ui/Label";
import { ShoppingListComponent } from "@/entities/ShoppingListComponent";
import {
  ShoppingListFunctions,
  useSave,
} from "@/widgets/ShoppingListFunctions";
import { ItemCreation } from "@/features/ItemCreation/ui/ItemCreation";

interface ShoppingListControlsProps {
  className?: string;
}

export const ShoppingListControls: FC<ShoppingListControlsProps> = ({
  className = "",
}: ShoppingListControlsProps) => {
  const save = useSave((state) => state.save);
  const [addItem, setAddItem] = useState(false);

  const onClickAddItem = useCallback(() => {
    setAddItem(true);
  }, []);

  const onClickCancel = useCallback(() => {
    setAddItem(false);
  }, []);
  return (
    <aside
      className={`${className} w-[390px] bg-[#FFF0DE] flex flex-col items-center h-screen pt-[44px] gap-11`}
    >
      {addItem ? (
        <ItemCreation onClick={onClickCancel} />
      ) : (
        <>
          <AddItem onClick={onClickAddItem} />
          <Label type={"big"}>Shopping List</Label>
          <ShoppingListComponent />
          <ShoppingListFunctions save={save} />
        </>
      )}
    </aside>
  );
};
