import { memo, useCallback } from "react";
import type { FC } from "react";

import { Plus } from "lucide-react";
import { Label } from "@/shared/ui/Label/Label";
import { Button } from "@/shared/ui/Button";
import { useItemInfo } from "@/entities/ItemInfo";
import { ItemSchema, ItemType } from "../model/types/ItemSchema";
import { useSideComponent } from "@/shared/store/useSideComponent";

interface ItemProps {
  className?: string;
  item: ItemSchema;
  categoryName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Item: FC<ItemProps> = memo(function Item({
  item,
  categoryName,
  className = "",
  onClick = () => {},
  disabled = false,
}: ItemProps) {
  const setItemInfo = useItemInfo((state) => state.setItemInfo);
  const setSideComponent = useSideComponent((state) => state.setSideComponent);

  const onClickLabelItem = () => {
    const currentItem: ItemType = {
      name: item.name,
      image: item.image,
      note: item.note,
      category: categoryName,
    };
    setItemInfo(currentItem);
    setSideComponent("itemInfo");
  };

  return (
    <div
      className={`${className} bg-white rounded-xl p-4 flex justify-between items-center w-[182px] min-h-[50px] shadow shadow-[rgba(0, 0, 0, 0.05)]`}
    >
      <Label
        className='hover:underline hover:cursor-pointer'
        type={disabled ? "disabled" : "regular"}
        onClick={onClickLabelItem}
      >
        {item.name}
      </Label>
      <Button
        disabled={disabled}
        variant={"outline"}
        size={"outline"}
        onClick={() => onClick()}
      >
        <Plus
          className='cursor-pointer hover:stroke-secondary'
          color='#C1C1C4'
        />
      </Button>
    </div>
  );
});
