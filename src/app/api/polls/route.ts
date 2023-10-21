import { connectToDataBase } from "@/database/connect";
import { PollSchema } from "@/database/models/Poll";
import { authOptions } from "@/lib/auth";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectToDataBase();

  const polls = await PollSchema.find({});

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
  const newPoll = new PollSchema({
    title: data.title,
    options: data.options,
    userName: session.user.name,
    id: Math.random(),
  });

  await newPoll.save();
  return NextResponse.json({ msg: "Success" }, { status: 200 });
};
