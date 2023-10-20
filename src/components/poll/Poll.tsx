"use client";

import { FormEvent, useState } from "react";

type TPropsType = {
  title: string;
  options: string[];
};

export const Poll = ({ title, options }: TPropsType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckboxChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  return (
    <div className="w-[36rem] h-[28rem] rounded-xl bg-neutral-800 border-t-4 px-4 py-6 flex flex-col gap-8 border-t-primary">
      <p className="text-text font-bold text-3xl">{title}</p>
      <div className="flex flex-col gap-7">
        <p className="text-lg text-text font-medium">Make a choice</p>
        {options.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                className="bg-transparent w-8 h-8 rounded-full focus:ring-transparent outline-none checked:bg-primary appearance-none "
                type="checkbox"
                value={option}
                name={option.toLowerCase()}
                checked={selectedOption === option}
                onChange={() => handleCheckboxChange(option)}
              />
              <label
                className="text-primary font-semibold text-xl"
                htmlFor={option.toLowerCase()}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
      <button className="bg-primary text-2xl text-text py-2 w-5/6 mx-auto  rounded-xl font-bold">
        Vote
      </button>
    </div>
  );
};
