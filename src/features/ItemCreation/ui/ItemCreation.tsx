import { CategorySelect } from "@/features/CategorySelect";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { memo } from "react";
import type { FC } from "react";

interface ItemCreationProps {
  className?: string;
  onClick?: () => void;
}

export const ItemCreation: FC<ItemCreationProps> = memo(function ItemCreation({
  className = "",
  onClick = () => {},
}: ItemCreationProps) {
  return (
    <div
      className={`${className} w-full bg-transparent flex flex-col gap-5 items-center`}
    >
      <Label type={"24px"}>Add a new item</Label>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Name</Label>
        <Input theme={"disabled"} placeholder='Enter a name' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Note(optional)</Label>
        <Textarea placeholder='Enter a name' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Image(optional)</Label>
        <Input theme={"disabled"} type='dis' placeholder='Enter a url' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Category</Label>
        <CategorySelect />
      </div>
      <div className='flex gap-4 justify-center'>
        <Button
          onClick={onClick}
          type='button'
          variant={"ghost"}
          className='w-[87px] h-[61px]'
        >
          cancel
        </Button>
        <Button
          type='button'
          variant={"secondary"}
          className='w-[87px] h-[61px]'
        >
          Save
        </Button>
      </div>
    </div>
  );
});
