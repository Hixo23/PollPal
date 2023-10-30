"use client";

import { TOptions } from "@/types/types";
import { LuSubtitles, LuVote } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { ContextMenu } from "@radix-ui/themes";
import { deletePoll } from "@/lib/deletePoll";

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
    <ContextMenu.Root>
      <ContextMenu.Trigger className="bg-neutral-800">
        <div className="mx-auto grid min-h-[4rem] w-80 min-w-full grid-cols-3 grid-rows-1 items-center justify-items-center rounded-xl bg-neutral-800 p-4 text-text md:min-w-[40rem]">
          <p
            className="flex
      items-center justify-center gap-2 text-center font-bold"
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
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
