"use client";

import { TOptions, TPoll } from "@/types/types";
import { ChangeEvent, FormEvent, useState } from "react";
import wretch from "wretch";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

const AddPoll = () => {
  const [formFields, setFormFields] = useState<TOptions[]>([
    { name: "", votes: 0, id: uuid() },
  ]);
  const [formData, setFormData] = useState<TPoll>({
    title: "",
    options: formFields,
  });

  const router = useRouter();

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
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
    setFormFields(formFields.filter((form) => form.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.title !== null && formData.options) {
      wretch("/api/polls")
        .post(formData)
        .json((s) => router.push("/"));
    }
  };

  return (
    <main className="min-h-[80vh] min-w-[95vw] w-full h-full bg-neutral-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 min-h-[32rem] flex flex-col justify-around bg-neutral-800 rounded-xl p-6 text-text"
      >
        <div className="flex flex-col justify-start gap-3 w-[95%]">
          <label className="text-md text-text/70 font-medium" htmlFor="title">
            Title of poll
          </label>
          <input
            onChange={handleChangeTitle}
            className="bg-neutral-900 md:outline-none outline-primary border-0 rounded-md"
            type="text"
            name="title"
          />
        </div>
        <div className=" h-full flex flex-col gap-4 items-start mt-12">
          {formFields.map((form, index) => {
            return (
              <div key={index} className=" w-full h-full flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="">Option {index + 1}</label>
                  <button
                    onClick={() => handleDeleteOption(form.id)}
                    type="button"
                    className="mr-4"
                  >
                    X
                  </button>
                </div>
                <input
                  onChange={(event) => handleFormChange(event, index)}
                  className="bg-neutral-900 w-[95%] md:outline-none outline-primary border-0 rounded-md"
                  type="text"
                  name={form.name}
                />
              </div>
            );
          })}
        </div>
        <div className="flex h-full items-center my-4">
          <button
            type="button"
            onClick={handleAddNewOption}
            className="py-2 px-4 bg-accent rounded-xl font-2xl font-bold "
          >
            Add new option
          </button>
        </div>
        <button className="py-2 px-4 bg-primary hover:bg-primary/70 transition-colors duration-100 rounded-xl font-2xl font-bold ">
          Add new poll
        </button>
      </form>
    </main>
  );
};

export default AddPoll;
