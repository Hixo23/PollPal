import Link from "next/link";

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
      className={`${
        isActive
          ? "font-semibold text-primary before:absolute before:left-0 before:top-6 before:h-1 before:w-full before:rounded-xl before:bg-accent before:content-['']"
          : "text-text"
      } relative cursor-pointer`}
    >
      {name}
    </Link>
  );
};
