"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Tabs = () => {
  const pathname = usePathname();

  const items = [
    { name: "Add poll", url: "/add-poll" },
    { name: "Current polls", url: "/polls" },
  ];
  return (
    <div className="w-full flex justify-center gap-4 z-10">
      {items.map((item, index) => (
        <Tab key={index} {...item} isActive={item.url == pathname} />
      ))}
    </div>
  );
};

export const Tab = ({
  name,
  url,
  isActive,
}: {
  name: string;
  url: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={url}
      className={`${isActive && "text-primary"} text-text cursor-pointer`}
    >
      {name}
    </Link>
  );
};
