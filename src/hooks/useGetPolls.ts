import { getPolls } from "@/services/poll/poll";
import { useQuery } from "react-query";

export const useGetPolls = () =>
  useQuery(
    "polls",
    async (): Promise<TPoll[] | { msg: string }> => getPolls(),
    {
      refetchInterval: 2000,
    },
  );
