import { pollSchema } from "@/components/createpollform/CreatePollForm";
import wretch from "wretch";
import { z } from "zod";

export const addPoll = async (
  values: z.infer<typeof pollSchema>,
): Promise<{ id: string; msg: string }> => {
  return wretch("/api/polls")
    .post({
      title: values.title,
      options: values.options,
    })
    .json();
};

export const getPolls = async (): Promise<
  z.infer<typeof pollSchema> | { msg: "string" }
> => {
  return await wretch("api/polls")
    .get()
    .unauthorized(() => {
      msg: "Unauthorized";
    })
    .json();
};
export const getPoll = async (
  id: string,
): Promise<z.infer<typeof pollSchema>> => {
  return await wretch(`/api/poll?id=${id}`)
    .get()
    .notFound((err) => {
      return err;
    })
    .json();
};

export const deletePoll = (id: string): Promise<void> => {
  return wretch(`/api/poll?id=${id}`)
    .delete()
    .notFound((err) => {
      return err;
    })
    .res();
};
