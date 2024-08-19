"use client";

import { useGetPolls } from "@/hooks/useGetPolls";
import { Loading } from "../loading/Loading";
import { toast } from "sonner";
import { PollSummary } from "../poll/PollSummary";
import { z } from "zod";
import { pollSchema } from "../createpollform/CreatePollForm";

export const PollList = () => {
  const { data: polls, isLoading } = useGetPolls();

  if (isLoading) return <Loading />;

  if (polls && "msg" in polls) return toast(polls.msg);

  if (polls && polls?.length <= 0)
    return (
      <div className="my-24 flex w-full justify-center">
        <p className="text-4xl text-text">No Polls found</p>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      {polls &&
        polls!.length >= 1 &&
        polls?.map((poll: z.infer<typeof pollSchema>) => {
          return <PollSummary key={poll.id} {...poll} />;
        })}
    </div>
  );
};
