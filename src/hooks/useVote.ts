"use client";

import { optionSchema } from "@/components/createpollform/CreatePollForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import wretch from "wretch";
import { z } from "zod";

type UseVoteReturnType = [
  (selectedValue: string) => void,
  number,
  string | null,
  () => void,
];

export const useVote = ({
  options,
  pollId,
}: {
  options: z.infer<typeof optionSchema>;
  pollId: string;
}): UseVoteReturnType => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  if (!options) window.location.href = "/";

  const router = useRouter();

  const getSelectedOptionId = () => {
    if (selectedOption)
      return options.find((option) => option.id == selectedOption);
  };

  const sumOfVotes: number = options.reduce(
    (total, item) => total + item.votes,
    0,
  );

  const handleVote = () => {
    const selectedOption = getSelectedOptionId();

    wretch(`/api/vote?pollId=${pollId}&optionId=${selectedOption?.id}`)
      .get()
      .json((_) => router.push(`/pollresults/${pollId}`));
  };

  const handleCheckboxChange = (selectedValue: string) => {
    if (selectedValue === selectedOption) return setSelectedOption(null);
    setSelectedOption(selectedValue);
  };

  return [handleCheckboxChange, sumOfVotes, selectedOption, handleVote];
};
