import { memo } from "react";
import type { FC } from "react";

import { Plus } from "lucide-react";
import { Label } from "@/shared/ui/Label/Label";
import { Button } from "@/shared/ui/Button";

interface ItemProps {
  className?: string;
  name: string;
  onClick?: () => void;
}

export const Item: FC<ItemProps> = memo(function Item({
  name,
  className = "",
  onClick = () => {},
}: ItemProps) {
  return (
    <div
      className={`${className} bg-white rounded-xl p-4 flex justify-between items-center w-[182px] min-h-[50px] shadow shadow-[rgba(0, 0, 0, 0.05)]`}
    >
      <Label>{name}</Label>
      <Button variant={"outline"} size={"outline"} onClick={() => onClick()}>
        <Plus
          className='cursor-pointer hover:stroke-secondary'
          color='#C1C1C4'
        />
      </Button>
    </div>
  );
});
