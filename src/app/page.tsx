"use client";
import { Loading } from "@/components/loading/Loading";
import { SignIn } from "@/components/pages/signin/SignIn";
import { TPoll } from "@/types/types";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import wretch from "wretch";
import { PollSummary } from "@/components/poll/PollSummary";
import { toast } from "sonner";

export default function Home() {
  const { status, data } = useSession();

  const {
    data: polls,
    isLoading,
    isError,
  } = useQuery(
    "polls",
    async (): Promise<TPoll[]> => {
      return await wretch("api/polls")
        .get()
        .unauthorized(() => toast("Unauthorized"))
        .json();
    },
    {
      refetchInterval: 2000,
    },
  );

  if (isError) return <SignIn />;

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
        {!isError &&
          polls!.length >= 1 &&
          polls?.map((poll: TPoll) => {
            return <PollSummary key={poll.id} {...poll} />;
          })}
      </div>
    </main>
  );
}
