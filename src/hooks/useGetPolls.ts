import { pollSchema } from "@/components/createpollform/CreatePollForm";
import { getPolls } from "@/services/poll/poll";
import { useQuery } from "react-query";
import { z } from "zod";

export const useGetPolls = () =>
  useQuery(
    "polls",
    async (): Promise<z.infer<typeof pollSchema> | { msg: string }> =>
      getPolls(),
    {
      refetchInterval: 2000,
    },
  );
