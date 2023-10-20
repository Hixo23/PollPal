"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab } from "./Tab";

export const Tabs = () => {
  const pathname = usePathname();

  console.log(pathname);

  const items = [
    { name: "Add poll", url: "/add-poll" },
    { name: "Current polls", url: "/" },
  ];
  return (
    <div className="w-full flex justify-center gap-4 z-10">
      {items.map((item, index) => (
        <Tab key={index} {...item} isActive={item.url === pathname} />
      ))}
    </div>
  );
};
