import { pollSchema } from "@/components/createpollform/CreatePollForm";
import { db } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const pollId = searchParams.get("pollId");
  const optionId = searchParams.get("optionId");

  if (!pollId || !optionId)
    return NextResponse.json(
      {
        msg: "Missing params",
      },
      {
        status: 400,
      },
    );

  const poll = await db.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      options: true,
    },
  });

  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }

  const optionIndex = poll.options.findIndex(
    (opt: z.infer<typeof pollSchema>["options"][number]) => opt.id === optionId,
  );

  if (optionIndex === -1) {
    return NextResponse.json({ error: "Option not found" }, { status: 404 });
  }

  await db.pollOption.update({
    where: {
      id: optionId,
    },
    data: {
      votes: { increment: 1 },
    },
  });

  return NextResponse.json({ poll, msg: "Success" }, { status: 200 });
};
