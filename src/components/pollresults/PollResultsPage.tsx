"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/lib/getPoll";
import { Loading } from "@/components/loading/Loading";
import { PollResults } from "@/components/pollresults/PollResults";
import { toast } from "sonner";

export const PollResultsPage = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: poll,
    isLoading,
    isError,
  } = useQuery("poll", {
    queryFn: () => getPoll(params.id as string),
  });

  if (isError) {
    toast("Error");
    return router.push("/");
  }

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center">
      <PollResults id={poll!.id} />
    </main>
  );
};
