'use client';

import { TOptions } from "@/types/types";
import { LuSubtitles, LuVote } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const PollSummary = ({ id, options, title }: { id: string, title: string, options: TOptions[] }) => {
  const router = useRouter()
  const [allVotes, setAllVotes] = useState(0)
  useEffect(() => {
    options.forEach(f => setAllVotes(prevState => { return prevState += f.votes }))
  }, []);

  const handleClick = ()  => {
    router.push(`/pollresults/${id}`)
  }

  return (
    <div className="w-1/2 mx-auto h-16 grid grid-cols-3 grid-rows-1 items-center justify-items-center bg-neutral-800 text-text rounded-xl p-4">
      <p className="font-bold
      flex items-center gap-2"><LuSubtitles/> <span>{title}</span></p>
      <p className="font-bold
      flex items-center gap-2"><LuVote/> <span>{allVotes}</span></p>
      <button onClick={handleClick} className="bg-primary py-2 w-40 rounded-xl drop-shadow-2xl shadow-primary">Results</button>
    </div>
  );
};