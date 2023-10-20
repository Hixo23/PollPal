import { signIn } from "next-auth/react";

export const SignIn = () => {
  const handleSignIn = () => {
    signIn("discord");
  };
  return (
    <div className="w-full h-full absolute top-0 left-0 z-20 bg-neutral-900 overflow-hidden flex justify-center items-center text-text">
      <div className="w-1/3 h-1/2 bg-neutral-800 flex flex-col justify-between items-center py-8 rounded-xl">
        <div className="text-center">
          <p className="font-bold text-3xl">Hello!</p>
          <span className="text-text/60">
            Log in to the discord below to access the application
          </span>
        </div>
        <div className="flex items-center h-full">
          <button
            onClick={handleSignIn}
            className="py-2 px-6 bg-primary hover:bg-primary/70 transition-colors duration-150 text-text rounded-xl"
          >
            Sign in with discord!
          </button>
        </div>
      </div>
    </div>
  );
};
