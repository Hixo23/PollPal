import { Poll } from "../poll/Poll";

export const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex justify-between items-center px-24 w-full">
      <h2 className="text-7xl font-bold text-text flex flex-col">
        Create a poll <span className="text-primary">in seconds</span>
      </h2>
      <Poll
        title="Typescript vs javascript"
        options={["Typescript", "Javascript"]}
      />
    </section>
  );
};
