export const areOptionsValid = (formFields: TOption[]) => {
  if (formFields.length <= 0) return;
  for (const option of formFields) {
    if (!option.name.trim()) {
      return false;
    }
  }
  return true;
};
