"use client";

import { $api } from "@/shared/api/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return $api.delete(`/api/item?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
