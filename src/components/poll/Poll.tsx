"use client";

import { useGetPoll } from "@/hooks/useGetPoll";
import { useVote } from "@/hooks/useVote";
import { z } from "zod";
import { pollSchema } from "../createpollform/CreatePollForm";
import { Loading } from "../loading/Loading";
import { useMemo } from "react";

type TPropsType = {
  id: string;
  voteButtonDisabled: boolean;
  isMock: boolean;
};

const MOCK: z.infer<typeof pollSchema> = {
  title: "Example",
  id: "",
  options: [
    { name: "Example", votes: 2, id: "!" },
    { name: "Example", votes: 2, id: "2" },
  ],
};

export const PollVote = ({ id, voteButtonDisabled, isMock }: TPropsType) => {
  const { data } = useGetPoll(id);
  const poll = useMemo(() => {
    return isMock ? MOCK : data;
  }, [isMock, data]);
  const [handleCheckboxChange, sumOfVotes, selectedOption, handleVote] =
    useVote({
      options: poll?.options || [],
      pollId: id,
    });

  if (!poll && !isMock) return <Loading />;

  return (
    <div
      className={`flex min-h-fit w-1/2 min-w-[400px] flex-col  ${
        !voteButtonDisabled && "justify-between"
      } gap-8 rounded-lg border-t-4 border-t-primary bg-neutral-800 p-4 md:w-[36rem]`}
    >
      <p className="text-3xl font-bold text-text">{poll.title}</p>
      <div className="flex flex-col gap-7">
        <p className="text-lg font-medium text-text">Make a choice</p>
        {poll.options.map((option, index) => {
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
          onClick={() => handleVote()}
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
