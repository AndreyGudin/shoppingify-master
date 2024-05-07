"use client";

import { memo, useState } from "react";
import type { FC } from "react";

import { useShoppingList } from "@/entities/ShoppingListComponent";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useSession } from "next-auth/react";
import { SHOPPING_LIST_ID } from "@/shared/const/localStorage";

interface ShoppingListNameProps {
  className?: string;
}

export const ShoppingListName: FC<ShoppingListNameProps> = memo(
  function ShoppingListName({ className = "" }: ShoppingListNameProps) {
    const [name, setName] = useState("");
    const shoppingList = useShoppingList((state) => state.shoppingList);
    const { data: session } = useSession();

    const saveList = () => {
      const shoppingListArr = Array.from(shoppingList);
      if (session) {
        const data = {
          user: session.user,
          name,
          items: shoppingListArr,
        };
        fetch("http://localhost:3000/api/list", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((r) => r.json())
          .then((r) => {
            console.log("r2", r);
          })
          .catch((e) => console.log("error ", e));
      }
    };

    return (
      <div className={`${className} px-[40px] py-[35px] bg-white mt-auto`}>
        <div className={`relative`}>
          <Input
            disabled={shoppingList.size === 0}
            placeholder='Enter a name'
            theme={shoppingList.size > 0 ? "secondary" : "disabled"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button
            type='button'
            disabled={shoppingList.size === 0}
            variant={shoppingList.size > 0 ? "secondary" : "disabled"}
            className='w-[87px] h-[61px] absolute top-0 right-0'
            onClick={saveList}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
);
