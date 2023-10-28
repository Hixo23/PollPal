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
    <div className="mx-auto grid min-h-[4rem] w-1/2 min-w-full grid-cols-3 grid-rows-1 items-center justify-items-center rounded-xl bg-neutral-800 p-4 text-text md:min-w-fit">
      <p
        className="flex
      items-center gap-2 text-center font-bold"
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
        className="rounded-xl bg-primary px-4 py-2 shadow-primary drop-shadow-2xl md:w-40"
      >
        Results
      </button>
    </div>
  );
};
