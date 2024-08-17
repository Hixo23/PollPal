"use client";
import { Loading } from "@/components/loading/Loading";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import wretch from "wretch";
import { PollSummary } from "@/components/poll/PollSummary";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

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

  if (isLoading) return <Loading />;

  if (polls!.length < 1)
    return (
      <div className="my-24 flex w-full justify-center">
        <p className="text-4xl text-text">No Polls found</p>
      </div>
    );

  if (status !== "authenticated") router.push("/");

  return (
    <main className="flex min-h-screen justify-center overflow-hidden p-4 md:p-24">
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
