import { getPoll } from "@/services/poll/poll";
import { useQuery } from "react-query";

export const useGetPoll = (id: string) =>
  useQuery("poll", {
    queryFn: (): Promise<TPoll> => getPoll(id),
  });
