import { getServerSession } from "next-auth";

import { SignOutButton } from "@/features/SignOutButton";
import { db } from "@/config/db/db";
import { ItemsBoard } from "@/widgets/ItemsBoard";
import { ShoppingListControls } from "@/widgets/ShoppingListControls";
import { authOptions } from "@/config/authOptions/auth";

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      items: true,
    },
  });
  const session = await getServerSession(authOptions);

  console.log("session1", session);
  return (
    <main className='flex min-h-screen items-center'>
      <SignOutButton />
      <ItemsBoard categories={categories} />
      <ShoppingListControls />
    </main>
  );
}
