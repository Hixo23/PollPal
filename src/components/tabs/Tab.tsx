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
          ? "text-primary before:absolute before:left-0 before:top-6 before:content-[''] before:w-full before:h-1 before:bg-accent before:rounded-xl font-semibold"
          : "text-text"
      } cursor-pointer relative`}
    >
      {name}
    </Link>
  );
};
