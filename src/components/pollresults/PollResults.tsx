"use client";

import { TPoll } from "@/types/types";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import wretch from "wretch";
import { getPoll } from "@/lib/getPoll";

export const PollResults = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: poll, isLoading } = useQuery(["poll", id], {
    queryFn: () => getPoll(id as string),
  });

  return (
    <>
      {!isLoading && (
        <div
          onClick={() => router.push(`/pollresults/${poll?.id}`)}
          className="flex  w-1/2 min-w-[400px] cursor-pointer flex-col gap-8  rounded-xl border-t-4 border-t-primary bg-neutral-800 p-4 pb-24  md:w-[36rem] md:p-6"
        >
          <p className="text-3xl font-bold text-text">{poll?.title}</p>
          <div className="flex flex-col gap-7">
            {poll?.options.map((option, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xl font-semibold text-text"
                >
                  <p>
                    {index + 1}. {option.name}
                  </p>
                  <span>({option.votes})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
