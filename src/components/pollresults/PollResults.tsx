"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getPoll } from "@/lib/getPoll";
import { useEffect, useState } from "react";

export const PollResults = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: poll, isLoading } = useQuery(["poll", id], {
    queryFn: () => getPoll(id as string),
  });

  const [allVotes, setAllVotes] = useState(0);

  useEffect(() => {
    poll?.options.forEach(f => setAllVotes(prevState => { return prevState += f.votes }))
  },[poll?.options])


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
                 <progress max="100" className="progress-bar-secondary progress-value-primary rounded-xl" value={Math.round((option.votes / allVotes) * 100)}/>
                  <p>({option.votes})</p>
                </div>
              );
            })}
            <p className="font-semibold text-text/60">All votes: {allVotes}</p>
          </div>
        </div>
      )}
    </>
  );
};
