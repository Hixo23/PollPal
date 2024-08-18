"use client";

import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { addPoll } from "@/services/poll/poll";

export const optionSchema = z
  .object({
    name: z.string().min(3),
    votes: z.number(),
  })
  .array();

export const pollSchema = z.object({
  title: z.string().min(4),
  options: optionSchema,
});
export const CreatePollForm = () => {
  const form = useForm({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      title: "",
      options: [{ name: "", votes: 0 }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "options",
  });

  const router = useRouter();

  const handleAddNewOption = () => {
    if (fieldArray.fields.length > 4) return;
    fieldArray.append({ name: "", votes: 0 });
  };

  const handleDeleteOption = (index: number) => {
    if (fieldArray.fields.length < 2)
      return toast("You can't delete last option!");
    fieldArray.remove(index);
  };

  const onSubmit = async (values: z.infer<typeof pollSchema>) => {
    const response = await addPoll(values);
    router.push(`/poll/${response.id}`);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex min-h-[32rem] flex-col justify-around rounded-xl bg-neutral-800 p-6 text-text md:w-1/3"
    >
      <Controller
        name="title"
        control={form.control}
        render={({ field }) => (
          <div className="flex  flex-col justify-start gap-3">
            <label className="text-md font-medium text-text/70" htmlFor="title">
              Title of poll
            </label>
            <input
              {...field}
              className="rounded-md border-0 bg-neutral-900 outline-primary md:outline-none"
              type="text"
              name="title"
            />
            {form.formState.errors.title?.message && (
              <p>{form.formState.errors.title?.message}</p>
            )}
          </div>
        )}
      />
      <div className="mt-6 flex h-full flex-col items-start gap-4">
        <p className=" text-text/70">Options</p>
        {fieldArray.fields.map((field, index) => {
          return (
            <Controller
              name={`options.${index}.name`}
              control={form.control}
              render={({ field }) => (
                <div className="relative flex w-full items-center justify-between">
                  <input
                    aria-label={`Option ${index + 1}`}
                    {...field}
                    value={field.value}
                    className="w-full rounded-md border-0 bg-neutral-900 px-6 outline-primary md:outline-none"
                    type="text"
                    name={`options.${index}.name`}
                  />
                  <button
                    onClick={() => handleDeleteOption(index)}
                    type="button"
                    className="absolute right-0 bg-neutral-900 pr-4"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            />
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
