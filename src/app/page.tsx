import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions/auth";
import { SignOutButton } from "@/features/SignOutButton";
import { Item } from "@/shared/ui/Item";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SignOutButton />
      <Item name='Avaocado' />
    </main>
  );
}
