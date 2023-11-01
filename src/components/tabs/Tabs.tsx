"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab } from "./Tab";

export const Tabs = () => {
  const pathname = usePathname();

  const items = [
    { name: "Add poll", url: "/dashboard/add-poll" },
    { name: "Your polls", url: "/dashboard" },
  ];
  return (
    <div className="z-10 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start">
      {items.map((item, index) => (
        <Tab key={index} {...item} isActive={item.url === pathname} />
      ))}
    </div>
  );
};
