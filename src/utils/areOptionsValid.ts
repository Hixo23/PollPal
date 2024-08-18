import { optionSchema } from "@/components/createpollform/CreatePollForm";
import { z } from "zod";

export const areOptionsValid = (formFields: z.infer<typeof optionSchema>) => {
  if (formFields.length <= 0) return;
  for (const option of formFields) {
    if (!option.name.trim()) {
      return false;
    }
  }
  return true;
};
