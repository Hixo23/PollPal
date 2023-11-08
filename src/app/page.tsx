"use client";

import { PollVote } from "@/components/poll/Poll";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-[95vw] justify-center overflow-hidden p-4 ">
      <section className="flex flex-col items-center justify-center gap-12 md:flex-row md:justify-between">

        <div className='flex flex-col text-left gap-4'>
          <h2 className="w-1/2 text-6xl font-bold text-text">
            Create your poll <span className="text-primary">in seconds!</span>
          </h2>
          <Link href={'/add-poll'} className='w-fit py-2 px-4 bg-primary text-text rounded-xl'>Create poll</Link>
        </div>
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
