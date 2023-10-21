"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab } from "./Tab";

export const Tabs = () => {
  const pathname = usePathname();


  const items = [
    { name: "Add poll", url: "/add-poll" },
    { name: "Your polls", url: "/" },
  ];
  return (
    <div className="z-10 flex w-full justify-center gap-4">
      {items.map((item, index) => (
        <Tab key={index} {...item} isActive={item.url === pathname} />
      ))}
    </div>
  );
};
