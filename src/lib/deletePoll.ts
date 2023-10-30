import { TPoll } from "@/types/types";
import { router } from "next/client";
import { toast } from "sonner";
import wretch from "wretch";

export const deletePoll = async (id: string): Promise<TPoll> => {
  // toast("Poll deleted successfully");
  return await wretch(`/api/poll?id=${id}`)
    .delete()
    .notFound((err) => {
      router.push("/");
      return toast("This poll is not found!");
    })
    .json();
};
