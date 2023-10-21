"use client";
import { Loading } from "@/components/loading/Loading";
import { SignIn } from "@/components/pages/signin/SignIn";
import { Poll } from "@/components/poll/Poll";
import { TPoll } from "@/types/types";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import wretch from "wretch";

export default function Home() {
  const { status } = useSession();

  const { data: polls, isLoading } = useQuery(
    "polls",
    async (): Promise<TPoll[]> => {
      return await wretch("api/polls").get().json();
    }
  );

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      {status === "unauthenticated" && <SignIn />}
      <div className="flex flex-col gap-6">
        {polls!.map((poll: TPoll, i) => {
          return <Poll key={i} {...poll} />;
        })}
      </div>
    </main>
  );
}
