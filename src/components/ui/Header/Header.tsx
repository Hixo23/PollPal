"use client";

import { Tabs } from "@/components/tabs/Tabs";
import { DropdownMenu } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    signIn("discord");
  };

  return (
    <header className="sticky top-0 z-20 flex h-24 w-full items-center justify-between gap-4 rounded-xl px-10 py-4 shadow-xl backdrop-blur-xl backdrop-saturate-150 ">
      <h1 className="text-2xl font-bold text-text">
        <Link href={"/"}>PollPal</Link>
      </h1>

      {status == "authenticated" ? (
        <>
          <button
            className="text-2xl text-text md:hidden"
            onClick={toggleNavbar}
          >
            <GiHamburgerMenu />
          </button>
          <div
            className={`fixed left-0 top-0 z-20 flex h-screen w-screen flex-col  items-center justify-center gap-4 transition-transform duration-150 md:relative md:translate-x-0 ${
              isOpen ? "translate-x-0" : "-translate-x-[100%]"
            } bg-neutral-900 md:relative md:h-auto md:w-full md:flex-row md:justify-between md:gap-0 md:bg-transparent`}
          >
            <Tabs />
            <Profile session={session} status={status} />

            <button
              onClick={toggleNavbar}
              className="absolute right-0 top-0 z-20 m-4 flex text-4xl  text-text md:hidden"
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </>
      ) : (
        <>
          <Link
            className="font-medium tracking-wide text-gray-300 transition-colors duration-150 hover:text-text"
            href={"/create-poll"}
          >
            Create poll
          </Link>
          <button
            className="relative text-xl font-semibold before:absolute before:left-0 before:top-7 before:h-1 before:w-0 before:rounded-xl before:bg-primary before:transition-all before:duration-150 before:hover:w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};

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
