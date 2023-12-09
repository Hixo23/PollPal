"use client";

import { toast } from "sonner";
import wretch from "wretch";

export const deletePoll = async (id: string): Promise<TPoll> => {
  return await wretch(`/api/poll?id=${id}`)
    .delete()
    .notFound((err) => {
      window.location.href = "/";
      return toast("This poll is not found!");
    })
    .json();
};
