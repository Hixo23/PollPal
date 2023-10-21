import { TOptions } from "@/types/types";

export const areOptionsValid = (formFields: TOptions[]) => {
  for (const option of formFields) {
    if (!option.name.trim()) {
      return false; // Opcja nie ma nazwy
    }
  }
  return true; // Wszystkie opcje są poprawne
};
