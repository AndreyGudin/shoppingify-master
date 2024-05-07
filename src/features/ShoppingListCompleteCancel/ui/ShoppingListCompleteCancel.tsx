import { useShoppingList } from "@/entities/ShoppingListComponent";
import { Button } from "@/shared/ui/Button";
import { useSession } from "next-auth/react";
import { memo } from "react";
import type { FC } from "react";

interface ShoppingListCompleteCancelProps {
  className?: string;
}

export const ShoppingListCompleteCancel: FC<ShoppingListCompleteCancelProps> =
  memo(function ShoppingListCompleteCancel({
    className = "",
  }: ShoppingListCompleteCancelProps) {
    const updateShoppingList = useShoppingList(
      (state) => state.updateShoppingList
    );
    const { data: session } = useSession();

    const onCancel = () => {
      if (session) {
        fetch(`http://localhost:3000/api/list?email=${session.user.email}`, {
          method: "DELETE",
        })
          .then((e) => {
            updateShoppingList(new Map([]));
            console.log("delete", e);
          })
          .catch((e) => console.log("error delete", e));
      }
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
