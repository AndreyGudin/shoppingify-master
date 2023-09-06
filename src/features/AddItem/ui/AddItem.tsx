import { memo } from "react";
import Image from "next/image";
import type { FC } from "react";

import { Button } from "@/shared/ui/Button";
import { Label } from "@/shared/ui/Label";
import KetchupIcon from "p/ketchup-svgrepo-com.svg";

interface AddItemProps {
  className?: string;
}

export const AddItem: FC<AddItemProps> = memo(function AddItem({
  className = "",
}: AddItemProps) {
  return (
    <div
      className={`${className} w-[308px] h-[130px] bg-[#80485B] flex rounded-3xl items-center p-5`}
    >
      <div className='relative w-[100px] h-[120px]'>
        <Image
          src={KetchupIcon}
          className='absolute bottom-[10px] left-0 -rotate-12'
          width={70}
          height={80}
          alt='ketchup'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <Label type={"white"}>Didn&apos;t find what you need?</Label>
        <Button>Add item</Button>
      </div>
    </div>
  );
});
