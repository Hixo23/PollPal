import { TPoll } from "@/types/types";
import { router } from "next/client";
import { toast } from "sonner";
import wretch from "wretch";

export const getPoll = async (id: string): Promise<TPoll> => {
  return await wretch(`/api/poll?id=${id}`)
    .get()
    .notFound((err) => {
      router.push("/");
      return toast("This poll is not found!");
    })
    .json();
};
