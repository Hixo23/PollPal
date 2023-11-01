"use client";

import { PollVote } from "@/components/poll/Poll";

export default function Home() {
  return (
    <main className="flex min-h-screen w-[95vw] justify-center overflow-hidden p-4 ">
      <section className="flex flex-col items-center justify-center gap-12 md:flex-row md:justify-between">
        <h2 className="w-1/2 text-6xl font-bold text-text">
          Create your poll <span className="text-primary">in seconds!</span>
        </h2>
        <PollVote
          title="Example poll"
          options={[
            { name: "Example", id: "1", votes: 0 },
            { name: "Example", id: "2", votes: 0 },
            { name: "Example", id: "3", votes: 0 },
          ]}
          id="sdad"
          voteButtonDisabled={true}
        />
      </section>
    </main>
  );
}
