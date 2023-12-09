"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import wretch from "wretch";

type UseVoteReturnType = [
  (selectedValue: string) => void, // handleCheckboxChange
  number, // sumOfVotes
  string | null, // selectedOption
  () => void, // handleVote
];

export const useVote = ({
  options,
  pollId,
}: {
  options: TOption[];
  pollId: string;
}): UseVoteReturnType => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
