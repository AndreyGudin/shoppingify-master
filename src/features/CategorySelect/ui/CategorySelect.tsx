"use client";
import { useEffect, useState } from "react";
import { memo } from "react";
import type { FC } from "react";
import { cn } from "@/shared/lib/lib";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
  ComboboxButton,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useGetCategories } from "../model/api/hooks/useGetCategories/useGetCategories";
import { CategorySchema } from "@/entities/Category";
import { UseControllerProps, useController } from "react-hook-form";
import { ItemType } from "@/entities/Item";

interface CategorySelectProps {
  category: string;
}

export const CategorySelect = function CategorySelect(
  props: UseControllerProps<ItemType>
) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});
  const { field, fieldState } = useController(props);

  const { data: categories, isLoading, isPending } = useGetCategories();
  const filteredPeople =
    query === ""
      ? categories?.categories
      : categories?.categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value!);
        field.onChange(value!);
      }}
    >
      <div className='relative w-[310px] h-[61px]'>
        <ComboboxInput
          placeholder='Enter a category'
          className={cn(
            "w-full h-full rounded-lg border-2 border-disabled  py-1.5 pr-8 pl-3 text-sm/6 text-black",
            "focus:border-secondary focus:border-2 data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={(category: CategorySchema) => category?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
          <ChevronDown className='size-4 fill-white/60 group-data-[hover]:fill-white' />
        </ComboboxButton>
      </div>
      <Transition
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        afterLeave={() => setQuery("")}
      >
        <ComboboxOptions
          anchor='bottom'
          className='w-[var(--input-width)] rounded-xl border border-disabled bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden'
        >
          {query.length > 0 && (
            <ComboboxOption
              value={{
                id: categories?.categories.length
                  ? categories?.categories.length + 1
                  : 0,
                name: query,
              }}
              className='data-[focus]:bg-blue-100'
            >
              Create <span className='font-bold'>`{query}`</span>
            </ComboboxOption>
          )}
          {isLoading ? (
            <>Loading</>
          ) : (
            filteredPeople?.map((category) => (
              <ComboboxOption
                key={category.id}
                value={category}
                className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10'
              >
                <Check className='invisible size-4 fill-white group-data-[selected]:visible' />
                <div className='text-sm/6 text-black'>{category.name}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
};
