import { signIn } from "next-auth/react";

export const SignIn = () => {
  const handleSignIn = () => {
    signIn("discord");
  };
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center overflow-hidden bg-neutral-900 text-text">
      <div className="flex h-1/2 w-1/3 flex-col items-center justify-between rounded-xl bg-neutral-800 py-8">
        <div className="text-center">
          <p className="text-3xl font-bold">Hello!</p>
          <span className="text-text/60">
            Log in to the discord below to access the application
          </span>
        </div>
        <div className="flex h-full items-center">
          <button
            onClick={handleSignIn}
            className="rounded-xl bg-primary px-6 py-2 text-text transition-colors duration-150 hover:bg-primary/70"
          >
            Sign in with discord!
          </button>
        </div>
      </div>
    </div>
  );
};
