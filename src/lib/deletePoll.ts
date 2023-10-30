"use client";

import { TPoll } from "@/types/types";
import { toast } from "sonner";
import wretch from "wretch";

export const deletePoll = async (id: string): Promise<TPoll> => {
  toast("Poll deleted successfully");
  return await wretch(`/api/poll?id=${id}`)
    .delete()
    .notFound((err) => {
      window.location.href = "/";
      return toast("This poll is not found!");
    })
    .json();
};
