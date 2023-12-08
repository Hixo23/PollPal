"use client";

import { TOptions } from "@/types/types";
import { useState } from "react";
import wretch from "wretch";
import { useRouter } from "next/navigation";

type TPropsType = {
  title: string;
  options: TOptions[];
  id: string;
  voteButtonDisabled: boolean;
};

export const PollVote = ({
  title,
  options,
  id,
  voteButtonDisabled,
}: TPropsType) => {
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

    wretch(`/api/vote?pollId=${id}&optionId=${selectedOption?.id}`)
      .get()
      .json((_) => router.push(`/pollresults/${id}`));
  };

  const handleCheckboxChange = (selectedValue: string) => {
    if (selectedValue === selectedOption) return setSelectedOption(null);
    setSelectedOption(selectedValue);
  };

  return (
    <div
      className={`flex min-h-fit w-1/2 min-w-[400px] flex-col  ${
        !voteButtonDisabled && "justify-between"
      } gap-8 rounded-lg border-t-4 border-t-primary bg-neutral-800 p-4 md:w-[36rem]`}
    >
      <p className="text-3xl font-bold text-text">{title}</p>
      <div className="flex flex-col gap-7">
        <p className="text-lg font-medium text-text">Make a choice</p>
        {options.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                key={index}
                className="h-8 w-8 appearance-none rounded-full bg-transparent outline-none checked:bg-primary focus:ring-transparent "
                type="checkbox"
                value={option.name}
                name={option.name}
                checked={selectedOption === option.id}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <label
                className="text-xl font-semibold text-primary"
                htmlFor={option.name}
              >
                {option.name}
              </label>
            </div>
          );
        })}
      </div>
      {!voteButtonDisabled && (
        <button
          onClick={handleVote}
          className="mx-auto mb-4 w-5/6 rounded-xl bg-primary py-2 text-2xl font-bold text-text"
        >
          Vote
        </button>
      )}
      <hr className="w-full border-gray-400" />
      <p className="font-medium text-gray-400 md:text-xl">{sumOfVotes} Votes</p>
    </div>
  );
};
