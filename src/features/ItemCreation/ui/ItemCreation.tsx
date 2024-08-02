import { ItemType, ItemTypeCreation } from "@/entities/Item";
import { CategorySelect } from "@/features/CategorySelect";
import { usePostProduct } from "@/shared/api/hooks/usePostItem";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { memo } from "react";
import type { FC } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface ItemCreationProps {
  className?: string;
  onClick?: () => void;
}

export const ItemCreation: FC<ItemCreationProps> = memo(function ItemCreation({
  className = "",
  onClick = () => {},
}: ItemCreationProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemTypeCreation>({
    mode: "onSubmit",
    defaultValues: {
      category: {},
      image: "",
      name: "",
      note: "",
    },
  });
  const postProduct = usePostProduct();

  const onSubmit: SubmitHandler<ItemTypeCreation> = (data) => {
    const result = postProduct.mutate(data);
    console.log("result", result);
  };

  return (
    <form
      className={`${className} w-full bg-transparent flex flex-col gap-5 items-center`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label type={"24px"}>Add a new item</Label>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Name</Label>
        <Input
          {...register("name", { required: true })}
          theme={"disabled"}
          placeholder='Enter a name'
        />
        {errors.name?.type === "required" && (
          <Label>This field is required</Label>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Note(optional)</Label>
        <Textarea {...register("note")} placeholder='Enter a name' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Image(optional)</Label>
        <Input
          {...register("image")}
          theme={"disabled"}
          type='dis'
          placeholder='Enter a url'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label type={"medium"}>Category</Label>
        <CategorySelect
          name={"category"}
          control={control}
          rules={{ required: true }}
        />
        {errors.category?.type === "required" && (
          <Label>This field is required</Label>
        )}
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
          type='submit'
          variant={"secondary"}
          className='w-[87px] h-[61px]'
          onClick={() => {
            console.log(errors);
          }}
        >
          Save
        </Button>
      </div>
    </form>
  );
});
