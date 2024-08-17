import wretch from "wretch";

export const addPoll = async (
  formData: any,
): Promise<{ id: string; msg: string }> => {
  return wretch("/api/polls").post(formData).json();
};
export const getPoll = async (id: string): Promise<TPoll> => {
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
