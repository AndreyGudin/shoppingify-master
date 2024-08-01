"use client";

import { CategorySchema } from "../../../model/types/CategorySchema";
import { $api } from "@/shared/api/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesItems = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await $api.get<{ categories: CategorySchema[] }>(
        "/api/category"
      );
      return result.data.categories;
    },
  });
};
