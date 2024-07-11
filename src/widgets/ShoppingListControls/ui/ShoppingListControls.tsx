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
import { CategorySchema } from "@/entities/Category";
import { ItemInfo } from "@/entities/ItemInfo";
import { useSideComponent } from "@/shared/store/useSideComponent";

interface ShoppingListControlsProps {
  categories?: CategorySchema[];
  className?: string;
}

export const ShoppingListControls: FC<ShoppingListControlsProps> = ({
  className = "",
}: ShoppingListControlsProps) => {
  const save = useSave((state) => state.save);
  const sideComponent = useSideComponent((state) => state.sideComponent);
  const [addItem, setAddItem] = useState(false);

  const onClickAddItem = useCallback(() => {
    setAddItem(true);
  }, []);

  const onClickCancel = useCallback(() => {
    setAddItem(false);
  }, []);

  const mainBody = addItem ? (
    <ItemCreation onClick={onClickCancel} />
  ) : (
    <>
      <AddItem onClick={onClickAddItem} />
      <Label type={"big"}>Shopping List</Label>
      {sideComponent === "shoppingList" && <ShoppingListComponent />}
      <ShoppingListFunctions save={save} />
    </>
  );

  return (
    <aside
      className={`${className} w-[390px] bg-[#FFF0DE] flex flex-col items-center h-screen pt-[44px] gap-11`}
    >
      {sideComponent === "itemInfo" ? <ItemInfo /> : mainBody}
    </aside>
  );
};
