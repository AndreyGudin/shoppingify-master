import { CategorySchema } from "@/entities/Category";
import { useQuery } from "@tanstack/react-query";

const getCategories = async (): Promise<{
  categories: Omit<CategorySchema, "items">[];
}> => {
  const response = await fetch(`http://localhost:3000/api/category`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
