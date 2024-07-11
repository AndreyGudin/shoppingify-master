import { memo, useCallback } from "react";
import type { FC } from "react";
import Image from "next/image";
import { useItemInfo } from "@/entities/ItemInfo/model/store/useItemInfo";
import { Button } from "@/shared/ui/Button";
import { useSideComponent } from "@/shared/store/useSideComponent";
import { MoveLeft } from "lucide-react";
import { Label } from "@/shared/ui/Label";

interface ItemInfoProps {
  className?: string;
}

export const ItemInfo: FC<ItemInfoProps> = memo(function ItemInfo({
  className = "",
}: ItemInfoProps) {
  const itemInfo = useItemInfo((state) => state.itemInfoState);
  const setSideComponent = useSideComponent((state) => state.setSideComponent);

  const handleClick = useCallback(() => {
    setSideComponent("shoppingList");
  }, [setSideComponent]);

  return (
    <div className={`${className} flex flex-col items-start px-11 gap-8`}>
      <Button variant={"ghost"} onClick={handleClick}>
        <MoveLeft className='text-secondary' />
        <span className='text-secondary'>back</span>
      </Button>
      <img
        width={500}
        height={500}
        className='rounded-3xl'
        src={`${itemInfo.image}`}
        alt={`${itemInfo.name}`}
      />
      <div className='flex flex-col gap-3'>
        <Label type={"mediumGray"}>{itemInfo.category}</Label>
        <Label type={"24px"}>{itemInfo.name}</Label>
      </div>
      <div className='flex flex-col gap-3'>
        <Label type={"mediumGray"}>note</Label>
        <Label type={"24px"}>{itemInfo.note}</Label>
      </div>
      <div className='w-full flex justify-center justify-around'>
        <Button variant={"ghost"}>delete</Button>
        <Button variant={"secondary"}>Add to list</Button>
      </div>
    </div>
  );
});
