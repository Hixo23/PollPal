"use client";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {status === "unauthenticated" ? (
        <button onClick={handleLogin}>Sign in with discord</button>
      ) : (
        <button onClick={handleSignOut}>Sign out</button>
      )}
    </main>
  );
}
