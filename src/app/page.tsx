"use client";

import { PollVote } from "@/components/poll/Poll";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-[95vw] justify-center overflow-hidden p-4 ">
      <section className="flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:justify-around">
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <h2 className="text-4xl font-bold text-text md:w-2/3 md:text-6xl">
            Create your poll <span className="text-primary">in seconds!</span>
          </h2>
          <Link
            href={"/add-poll"}
            className="flex w-fit items-center gap-3 rounded-lg bg-primary px-6 py-2 font-medium text-text transition-colors hover:bg-primary/80"
          >
            Create poll
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 5.49997C0 5.30106 0.0790178 5.11029 0.21967 4.96964C0.360322 4.82899 0.551088 4.74997 0.75 4.74997H9.4395L6.219 1.53097C6.07817 1.39014 5.99905 1.19913 5.99905 0.999971C5.99905 0.800808 6.07817 0.609801 6.219 0.468971C6.35983 0.328141 6.55084 0.249023 6.75 0.249023C6.94916 0.249023 7.14017 0.328141 7.281 0.468971L11.781 4.96897C11.8508 5.03864 11.9063 5.1214 11.9441 5.21252C11.9819 5.30364 12.0013 5.40132 12.0013 5.49997C12.0013 5.59862 11.9819 5.6963 11.9441 5.78742C11.9063 5.87854 11.8508 5.9613 11.781 6.03097L7.281 10.531C7.14017 10.6718 6.94916 10.7509 6.75 10.7509C6.55084 10.7509 6.35983 10.6718 6.219 10.531C6.07817 10.3901 5.99905 10.1991 5.99905 9.99997C5.99905 9.80081 6.07817 9.6098 6.219 9.46897L9.4395 6.24997H0.75C0.551088 6.24997 0.360322 6.17095 0.21967 6.0303C0.0790178 5.88965 0 5.69888 0 5.49997Z"
                fill="#F8F8F8"
              />
            </svg>
          </Link>
        </div>
        <div className="hidden md:flex">
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
        </div>
      </section>
    </main>
  );
}
