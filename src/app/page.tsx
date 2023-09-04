import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions/auth";
import { SignOutButton } from "@/features/SignOutButton";
import { Item } from "@/shared/ui/Item";
import { db } from "@/config/db/db";
import { ItemsBoard } from "@/features/ItemsBoard/ui/ItemsBoard";

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      items: true,
    },
  });
  console.log(categories);
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <SignOutButton />
      <ItemsBoard categories={categories} />
    </main>
  );
}
