"use client";

import { PollVote } from "@/components/poll/Poll";
import { TPoll } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { toast } from "sonner";
import wretch from "wretch";

const PollPage = () => {
  const params = useParams();
  const router = useRouter();

  const { data: poll, isLoading } = useQuery(
    "poll",
    async (): Promise<TPoll> => {
      return await wretch(`/api/poll?id=${params.id}`)
        .get()
        .notFound((err) => {
          router.push("/");
          return toast("This poll is not found!");
        })
        .json();
    },
  );

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center">
      {!isLoading && (
        <PollVote title={poll!.title} options={poll!.options} id={poll!.id} />
      )}
    </main>
  );
};

export default PollPage;
