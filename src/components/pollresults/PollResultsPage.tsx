"use client";

import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/lib/getPoll";
import { Loading } from "@/components/loading/Loading";
import { PollResults } from "@/components/pollresults/PollResults";

export const PollResultsPage = () => {
  const params = useParams();

  const { data: poll, isLoading } = useQuery("poll", {
    queryFn: () => getPoll(params.id as string),
  });

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center">
      <PollResults id={poll!.id} />
    </main>
  );
};
