"use client";

import { TOptions } from "@/types/types";
import { useState } from "react";
import wretch from "wretch";

type TPropsType = {
  title: string;
  options: TOptions[];
  id: string;
};

export const PollVote = ({ title, options, id }: TPropsType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getSelectedOptionId = () => {
    if (selectedOption)
      return options.find((option) => option.name == selectedOption);
  };

  const handleVote = () => {
    const selectedOption = getSelectedOptionId();

    wretch(`/api/vote?pollId=${id}&optionId=${selectedOption?.id}`)
      .get()
      .json();
  };

  const handleCheckboxChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  return (
    <div className="flex h-1/3 w-1/2 flex-col justify-between  gap-8 rounded-xl border-t-4 border-t-primary bg-neutral-800 p-4 md:h-[28rem] md:w-[36rem] md:p-6">
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
                checked={selectedOption === option.name}
                onChange={() => handleCheckboxChange(option.name)}
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
      <button
        onClick={handleVote}
        className="mx-auto w-5/6 rounded-xl bg-primary py-2 text-2xl  font-bold text-text"
      >
        Vote
      </button>
    </div>
  );
};
