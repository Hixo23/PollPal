export const Loading = () => {
  return (
    <div className="absolute left-0 top-0 flex h-[60vh] w-full items-center justify-center overflow-hidden py-24">
      <p className="h-32 w-32 animate-spin rounded-full border-4 border-neutral-800 border-l-white text-4xl font-bold"></p>
    </div>
  );
};
