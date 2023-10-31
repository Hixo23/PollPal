import { connectToDataBase } from "@/database/connect";
import { PollSchema } from "@/database/models/Poll";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const GET = async () => {
  await connectToDataBase();

  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ msg: "User not found" }, { status: 200 });

  const polls = await PollSchema.find({ userName: session.user?.name });

  return NextResponse.json(polls);
};

export const POST = async (request: NextRequest) => {
  await connectToDataBase();

  const session = await getServerSession(authOptions);

  const data: { title: string; options: string[] } = await request.json();

  if (!data.title || !data.options)
    return NextResponse.json({ msg: "No data" }, { status: 400 });

  if (!session?.user)
    return NextResponse.json({ msg: "User not found" }, { status: 404 });

  const newPollObject = {
    title: data.title,
    options: data.options,
    userName: session.user.name,
    id: uuid(),
  };

  const newPoll = new PollSchema(newPollObject);

  await newPoll.save();
  return NextResponse.json(
    { msg: "Success", id: newPollObject.id },
    { status: 200 },
  );
};
