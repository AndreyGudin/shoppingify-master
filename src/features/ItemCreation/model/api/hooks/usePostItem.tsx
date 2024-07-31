"use client";

import { ItemType } from "@/entities/Item";
import { ItemTypeCreation } from "@/entities/Item/model/types/ItemSchema";
import { $api } from "@/shared/api/instance";
import { useMutation } from "@tanstack/react-query";

export const usePostProduct = () => {
  return useMutation({
    mutationFn: (item: ItemTypeCreation) => {
      return $api.post("/api/item", item);
    },
  });
};
