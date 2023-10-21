"use client";

import { TOptions } from "@/types/types";
import { useState } from "react";

type TPropsType = {
  title: string;
  options: TOptions[];
};

export const PollVote = ({ title, options }: TPropsType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckboxChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  return (
    <div className="flex h-[28rem] w-[36rem] flex-col justify-between gap-8 rounded-xl border-t-4 border-t-primary bg-neutral-800 px-4 py-6">
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
      <button className="mx-auto w-5/6 rounded-xl bg-primary py-2 text-2xl  font-bold text-text">
        Vote
      </button>
    </div>
  );
};
