import { connectToDataBase } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { PollSchema } from "@/database/models/Poll";

export const GET = async (request: NextRequest) => {
  await connectToDataBase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const poll = await PollSchema.findOne({ id });

  if (!poll)
    return NextResponse.json(
      { msg: "This poll is not found" },
      { status: 404 },
    );

  return NextResponse.json(poll, { status: 200 });
};
