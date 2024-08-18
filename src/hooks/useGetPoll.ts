"use client";

import { pollSchema } from "@/components/createpollform/CreatePollForm";
import { getPoll } from "@/services/poll/poll";
import { useQuery } from "react-query";
import { z } from "zod";

export const useGetPoll = (id: string) =>
  useQuery("poll", {
    queryFn: (): Promise<z.infer<typeof pollSchema>> => getPoll(id),
  });
