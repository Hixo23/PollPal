import { PollList } from "@/components/polllist/PollList";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");
  return (
    <main className="flex min-h-screen justify-center overflow-hidden p-4 md:p-24">
      <PollList />
    </main>
  );
}
