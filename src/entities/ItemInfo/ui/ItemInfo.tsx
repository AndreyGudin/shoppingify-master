import { memo, useCallback } from "react";
import type { FC } from "react";
import Image from "next/image";
import { useItemInfo } from "@/entities/ItemInfo/model/store/useItemInfo";
import { Button } from "@/shared/ui/Button";
import { useSideComponent } from "@/shared/store/useSideComponent";
import { MoveLeft } from "lucide-react";
import { Label } from "@/shared/ui/Label";
import { useAddItem } from "@/shared/hooks/useAddItem";
import { useDeleteProduct } from "@/shared/api/hooks/useDeleteItem";

interface ItemInfoProps {
  className?: string;
}

export const ItemInfo: FC<ItemInfoProps> = memo(function ItemInfo({
  className = "",
}: ItemInfoProps) {
  const { categoryId, id, name, image, note, category } = useItemInfo(
    (state) => state.itemInfoState
  );
  const setSideComponent = useSideComponent((state) => state.setSideComponent);
  const addClick = useAddItem();
  const deleteProduct = useDeleteProduct();

  const handleBackClick = useCallback(() => {
    setSideComponent("shoppingList");
  }, [setSideComponent]);

  const handleAddClick = () => {
    const itemSchemaObj = { categoryId, id, name, image, note };
    addClick(category, itemSchemaObj);
    setSideComponent("shoppingList");
  };

  const handleDeleteClick = useCallback(() => {
    deleteProduct.mutate(id);
    setSideComponent("shoppingList");
  }, [deleteProduct, id, setSideComponent]);

  return (
    <div className={`${className} flex flex-col items-start px-11 gap-8`}>
      <Button variant={"ghost"} onClick={handleBackClick}>
        <MoveLeft className='text-secondary' />
        <span className='text-secondary'>back</span>
      </Button>
      <img
        width={500}
        height={500}
        className='rounded-3xl'
        src={`${image}`}
        alt={`${name}`}
      />
      <div className='flex flex-col gap-3'>
        <Label type={"mediumGray"}>{category}</Label>
        <Label type={"24px"}>{name}</Label>
      </div>
      <div className='flex flex-col gap-3'>
        <Label type={"mediumGray"}>note</Label>
        <Label type={"24px"}>{note}</Label>
      </div>
      <div className='w-full flex justify-center'>
        <Button onClick={handleDeleteClick} variant={"ghost"}>
          delete
        </Button>
        <Button onClick={handleAddClick} variant={"secondary"}>
          Add to list
        </Button>
      </div>
    </div>
  );
});
