import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions/auth";
import { SignInButton } from "@/features/SignInButton";
import { SignOutButton } from "@/features/SignOutButton";
import { User } from "@/entities/User/ui/User";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SignOutButton />
      <pre>{JSON.stringify(session)}</pre>
      <User />
    </main>
  );
}
