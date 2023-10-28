"use client";

import { TOptions } from "@/types/types";
import { LuSubtitles, LuVote } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const PollSummary = ({
  id,
  options,
  title,
}: {
  id: string;
  title: string;
  options: TOptions[];
}) => {
  const router = useRouter();

  const sumOfVotes: number = options.reduce(
    (total, item) => total + item.votes,
    0,
  );

  const handleClick = () => {
    router.push(`/pollresults/${id}`);
  };

  return (
    <div className="mx-auto grid h-16 w-1/2 min-w-fit grid-cols-3 grid-rows-1 items-center justify-items-center rounded-xl bg-neutral-800 p-4 text-text">
      <p
        className="flex
      items-center gap-2 font-bold"
      >
        <LuSubtitles /> <span>{title}</span>
      </p>
      <p
        className="flex
      items-center gap-2 font-bold"
      >
        <LuVote /> <span>{sumOfVotes}</span>
      </p>
      <button
        onClick={handleClick}
        className="w-40 rounded-xl bg-primary py-2 shadow-primary drop-shadow-2xl"
      >
        Results
      </button>
    </div>
  );
};
