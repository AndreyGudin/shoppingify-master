import { SignOutButton } from "@/features/SignOutButton";
import { db } from "@/config/db/db";
import { ItemsBoard } from "@/features/ItemsBoard/ui/ItemsBoard";
import { ShoppingListControls } from "@/features/ShoppingListControls";

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      items: true,
    },
  });
  console.log(categories);
  return (
    <main className='flex min-h-screen items-center'>
      <SignOutButton />
      <ItemsBoard categories={categories} />
      <ShoppingListControls />
    </main>
  );
}
