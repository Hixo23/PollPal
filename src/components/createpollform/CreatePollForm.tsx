"use client";

import { addPoll } from "@/services/poll/poll";
import { areOptionsValid } from "@/utils/areOptionsValid";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

export const CreatePollForm = () => {
  const [formFields, setFormFields] = useState<TOption[]>([
    { name: "", votes: 0, id: uuid() },
  ]);
  const [formData, setFormData] = useState<TPoll>({
    title: "",
    options: formFields,
    id: "",
    userName: "",
  });

  const router = useRouter();

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let data = [...formFields];

    data[index] = {
      ...data[index],
      name: event.target.value,
    };

    setFormFields(data);
    setFormData({ ...formData, options: formFields });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  };

  const handleAddNewOption = () => {
    if (formFields.length > 4) return;
    setFormFields([...formFields, { name: "", votes: 0, id: uuid() }]);
  };

  const handleDeleteOption = (id: string) => {
    if (formFields.length < 2) return toast("You can't delete last option!");
    setFormFields(formFields.filter((form) => form.id !== id));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      return toast("Write a title");
    }

    if (!areOptionsValid(formFields)) {
      return toast("All options must have names");
    }

    if (formData.options.length < 2)
      return toast("You should add minimum 2 options");

    if (formData.title && formData.options) {
      const response = await addPoll(formData);
      router.push(`/poll/${response.id}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[32rem] flex-col justify-around rounded-xl bg-neutral-800 p-6 text-text md:w-1/3"
    >
      <div className="flex w-[95%] flex-col justify-start gap-3">
        <label className="text-md font-medium text-text/70" htmlFor="title">
          Title of poll
        </label>
        <input
          onChange={handleChangeTitle}
          className="rounded-md border-0 bg-neutral-900 outline-primary md:outline-none"
          type="text"
          name="title"
        />
      </div>
      <div className="mt-6 flex h-full flex-col items-start gap-4">
        {formFields.map((form, index) => {
          return (
            <div key={index} className=" flex h-full w-full flex-col gap-2">
              <div className="relative flex justify-between font-medium">
                <label className="text-text/70" htmlFor="">
                  Option {index + 1}
                </label>
              </div>
              <div className="relative flex items-center">
                <input
                  onChange={(event) => handleFormChange(event, index)}
                  className="w-[95%] rounded-md border-0 bg-neutral-900 px-6 outline-primary md:outline-none"
                  type="text"
                  name={form.name}
                />
                <button
                  onClick={() => handleDeleteOption(form.id)}
                  type="button"
                  className="absolute bg-neutral-900 md:right-10"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-4 flex h-full items-center">
        <button
          type="button"
          onClick={handleAddNewOption}
          className="font-2xl rounded-xl bg-accent px-4 py-2 font-bold transition-colors duration-100 hover:bg-accent/75 "
        >
          Add new option
        </button>
      </div>
      <button className="font-2xl rounded-xl bg-primary px-4 py-2 font-bold transition-colors duration-100 hover:bg-primary/70 ">
        Add new poll
      </button>
    </form>
  );
};
