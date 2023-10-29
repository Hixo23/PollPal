"use client";
import { Loading } from "@/components/loading/Loading";
import { SignIn } from "@/components/pages/signin/SignIn";
import { TPoll } from "@/types/types";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import wretch from "wretch";
import { PollSummary } from "@/components/poll/PollSummary";

export default function Home() {
  const { status, data } = useSession();

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
    <main className="flex min-h-screen justify-center overflow-hidden p-4 md:p-24">
      {status === "unauthenticated" && <SignIn />}

      <div className="flex w-full flex-col items-center justify-center gap-6">
        {polls!
          .filter((poll) => poll.userName == data?.user?.name)
          .map((poll: TPoll, i) => {
            return <PollSummary key={i} {...poll} />;
          })}
      </div>
    </main>
  );
}
