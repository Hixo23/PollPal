"use client";

import { PollVote } from "@/components/poll/Poll";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/utils/getPoll";
import { Loading } from "@/components/loading/Loading";

const PollPage = () => {
  const params = useParams();

  const { data: poll, isLoading } = useQuery("poll", {
    queryFn: () => getPoll(params.id as string),
  });

  return (
    <main className="flex min-h-[80vh] min-w-full items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <PollVote
          voteButtonDisabled={false}
          title={poll!.title}
          options={poll!.options}
          id={poll!.id}
        />
      )}
    </main>
  );
};

export default PollPage;
