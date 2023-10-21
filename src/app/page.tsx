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
    },
  );

  if (isLoading) return <Loading />;

  if (polls!.length < 1)
    return (
      <div className="my-24 flex w-full justify-center">
        <p className="text-4xl text-text">No Polls found</p>
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden p-24">
      {status === "unauthenticated" && <SignIn />}

      <div className="flex flex-col gap-6">
        {polls!.reverse().map((poll: TPoll, i) => {
          return <Poll key={i} {...poll} />;
        })}
      </div>
    </main>
  );
}
