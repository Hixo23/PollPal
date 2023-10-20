"use client";
import { Loading } from "@/components/loading/Loading";
import { SignIn } from "@/components/pages/signin/SignIn";
import { Poll } from "@/components/poll/Poll";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import wretch from "wretch";

type TPoll = {
  title: string;
  options: string[];
};

export default function Home() {
  const { status } = useSession();

  const { data: polls, isLoading } = useQuery(
    "polls",
    async (): Promise<TPoll[]> => {
      return await wretch("api/polls").get().json();
    }
  );

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      {status === "unauthenticated" && <SignIn />}
      {polls!.map((poll: TPoll, i) => {
        return <Poll key={i} {...poll} />;
      })}
    </main>
  );
}
