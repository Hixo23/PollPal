"use client";

import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/utils/getPoll";
import { Loading } from "@/components/loading/Loading";
import { PollResults } from "@/components/pollresults/PollResults";

export const PollResultsPage = () => {
  const params = useParams();

  const {
    data: poll,
    isLoading,
    isError,
  } = useQuery("poll", {
    queryFn: () => getPoll(params.id as string),
  });

  if (isError) {
    return <p className="text-3xl">Poll not found!</p>;
  }

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center">
      <PollResults id={poll!.id} />
    </main>
  );
};
