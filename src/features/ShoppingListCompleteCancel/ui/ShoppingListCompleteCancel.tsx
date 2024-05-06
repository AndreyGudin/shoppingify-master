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
    const onCancel = () => {
      fetch("http://localhost:3000/api/list?id=2", {
        method: "DELETE",
      })
        .then((e) => console.log("delete", e))
        .catch((e) => console.log("error delete", e));
    };

    return (
      <div className={`${className} w-full px-[40px] py-[35px] bg-white flex`}>
        <Button
          onClick={onCancel}
          type='button'
          variant={"ghost"}
          className='w-[87px] h-[61px]'
        >
          cancel
        </Button>
        <Button type='button' variant={"blue"} className='w-[118px] h-[59px]'>
          Complete
        </Button>
      </div>
    );
  });
