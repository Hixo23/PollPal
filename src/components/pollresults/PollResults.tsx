"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/utils/getPoll";

export const PollResults = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: poll, isLoading } = useQuery(["poll", id], {
    queryFn: () => getPoll(id),
  });

  const sumOfVotes: number = poll
    ? poll?.options.reduce(
        (total: number, item: { votes: number }) => total + item.votes,
        0,
      )
    : 0;

  return (
    <>
      {!isLoading && (
        <div
          onClick={() => router.push(`/pollresults/${poll?.id}`)}
          className="flex  w-1/2 min-w-[400px] cursor-pointer flex-col gap-8  rounded-xl border-t-4 border-t-primary bg-neutral-800 p-4 pb-24  md:w-[36rem] md:p-6"
        >
          <p className="text-3xl font-bold text-text">{poll?.title}</p>
          <div className="flex flex-col gap-7">
            {poll?.options.map((option: TOption, index: number) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 grid-rows-1 gap-2 text-xl font-semibold text-text"
                >
                  <p>
                    {index + 1}. {option.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <progress
                      max="100"
                      className="rounded-xl progress-bar-secondary progress-value-primary"
                      value={Math.round((option.votes / sumOfVotes) * 100)}
                    />
                    <p>({option.votes})</p>
                  </div>
                </div>
              );
            })}
            <p className="font-semibold text-text/60">
              All votes: {sumOfVotes}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
