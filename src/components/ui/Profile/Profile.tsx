import { DropdownMenu } from "@radix-ui/themes";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

export const Profile = ({
  session,
  status,
}: {
  session: Session;
  status: string;
}) => {
  const handleSignout = () => {
    signOut();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="relative flex cursor-pointer items-center justify-center gap-4 rounded-lg bg-primary px-8 py-2">
          <Image
            className="h-12 w-12 rounded-full"
            src={session.user?.image as string}
            width={24}
            height={24}
            alt="Profile image"
          />
          <p className="text-xl font-bold text-text">{session.user?.name}</p>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="mt-4 w-40 text-center" size={"2"}>
        <DropdownMenu.Item onClick={handleSignout} className="text-center">
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
