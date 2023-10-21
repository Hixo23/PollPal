"use client";

import { Tabs } from "@/components/tabs/Tabs";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  return (
    <header className="w-full h-24 py-4 px-10 flex items-center gap-4 justify-between shadow-xl rounded-xl ">
      <h1 className="text-text font-bold text-2xl">Nayata</h1>
      <Tabs />
      <Profile />
    </header>
  );
};

export const Profile = () => {
  const { data: session, status } = useSession();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  if (status === "authenticated")
    return (
      <div
        onClick={toggleDropdown}
        className="py-2 px-8 bg-primary cursor-pointer flex items-center justify-center rounded-lg gap-4 relative"
      >
        <Image
          className="w-12 h-12 rounded-full"
          src={session.user?.image as string}
          width={24}
          height={24}
          alt="Profile image"
        />
        <p className="text-text text-xl font-bold">{session.user?.name}</p>
        {dropdownIsOpen && <Dropdown />}
      </div>
    );
};

export const Dropdown = () => {
  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="absolute top-20 w-full py-2 left-0 bg-primary flex flex-col rounded-xl ">
      <button
        onClick={handleSignout}
        className="w-full h-full hover:bg-primary/70 rounded-xl cursor-pointer z-10"
      >
        Sign out
      </button>
    </div>
  );
};
