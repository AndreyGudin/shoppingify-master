import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { memo } from "react";
import type { FC } from "react";

interface ShoppingListNameProps {
  className?: string;
}

export const ShoppingListName: FC<ShoppingListNameProps> = memo(
  function ShoppingListName({ className = "" }: ShoppingListNameProps) {
    return (
      <div className={`${className} px-[40px] py-[35px] bg-white mt-auto`}>
        <div className={`relative`}>
          <Input placeholder='Enter a name' theme={"secondary"} />
          <Button
            type='button'
            variant={"secondary"}
            className='w-[87px] h-[61px] absolute top-0 right-0'
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
);
