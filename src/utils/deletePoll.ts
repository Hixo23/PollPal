"use client";

import { toast } from "sonner";
import wretch, { WretchResponse } from "wretch";

export const deletePoll = (id: string): Promise<void> => {
  return wretch(`/api/poll?id=${id}`)
    .delete()
    .notFound(() => {
      window.location.href = "/";
      return toast("This poll is not found!");
    })
    .res((data: WretchResponse) => {
      toast("Poll deleted");
      data.json();
    });
};
