"use client";

import { PollVote } from "@/components/poll/Poll";
import { TPoll } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { toast } from "sonner";
import wretch from "wretch";
import { getPoll } from "@/lib/getPoll";

const PollPage = () => {
  const params = useParams();
  const router = useRouter();

  const { data: poll, isLoading } = useQuery(
    "poll",
    {
      queryFn: () => getPoll(params.id as string)
    }
  );

  return (
    <main className="flex min-h-[80vh] min-w-full items-center justify-center">
      {!isLoading && (
        <PollVote title={poll!.title} options={poll!.options} id={poll!.id} />
      )}
    </main>
  );
};

export default PollPage;
