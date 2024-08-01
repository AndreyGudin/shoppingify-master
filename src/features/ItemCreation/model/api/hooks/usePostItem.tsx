"use client";

import { ItemType } from "@/entities/Item";
import { ItemTypeCreation } from "@/entities/Item/model/types/ItemSchema";
import { $api } from "@/shared/api/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: ItemTypeCreation) => {
      return $api.post("/api/item", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
