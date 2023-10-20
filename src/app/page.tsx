"use client";
import { SignIn } from "@/components/pages/signin/SignIn";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn("discord");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      {status === "unauthenticated" && <SignIn />}
    </main>
  );
}
