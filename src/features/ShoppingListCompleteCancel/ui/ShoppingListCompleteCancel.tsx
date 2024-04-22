import { Button } from "@/shared/ui/Button";
import { memo } from "react";
import type { FC } from "react";

interface ShoppingListCompleteCancelProps {
  className?: string;
}

export const ShoppingListCompleteCancel: FC<ShoppingListCompleteCancelProps> =
  memo(function ShoppingListCompleteCancel({
    className = "",
  }: ShoppingListCompleteCancelProps) {
    return (
      <div className={`${className} w-full px-[40px] py-[35px] bg-white flex`}>
        <Button type='button' variant={"ghost"} className='w-[87px] h-[61px]'>
          cancel
        </Button>
        <Button type='button' variant={"blue"} className='w-[118px] h-[59px]'>
          Complete
        </Button>
      </div>
    );
  });
