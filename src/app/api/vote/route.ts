import { pollSchema } from "@/components/createpollform/CreatePollForm";
import { connectToDataBase } from "@/database/connect";
import { PollSchema } from "@/database/models/Poll";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (request: NextRequest) => {
  await connectToDataBase();
  const { searchParams } = new URL(request.url);

  const pollId = searchParams.get("pollId");
  const optionId = searchParams.get("optionId");

  const poll = await PollSchema.findOne({ id: pollId });

  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }

  const optionIndex = poll.options.findIndex(
    (opt: z.infer<typeof pollSchema>) => opt.id!.toString() === optionId,
  );

  if (optionIndex === -1) {
    return NextResponse.json({ error: "Option not found" }, { status: 404 });
  }

  poll.options[optionIndex].votes += 1;

  poll.markModified("options");

  await poll.save();

  return NextResponse.json({ poll, msg: "Success" }, { status: 200 });
};
