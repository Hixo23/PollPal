"use client";

import { usePathname } from "next/navigation";
import { Tab } from "./Tab";

const items = [
  { name: "Create poll", url: "/create-poll" },
  { name: "Your polls", url: "/dashboard" },
];

export const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="z-10 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start">
      {items.map((item, index) => (
        <Tab key={index} {...item} isActive={item.url === pathname} />
      ))}
    </div>
  );
};
