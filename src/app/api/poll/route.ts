import { db } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      {
        msg: "Missing id",
      },
      {
        status: 400,
      },
    );

  const poll = await db.poll.findUnique({
    where: {
      id,
    },
    include: {
      options: true,
    },
  });

  if (!poll)
    return NextResponse.json(
      { msg: "This poll is not found" },
      { status: 404 },
    );

  return NextResponse.json(poll, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      {
        msg: "Missing id",
      },
      {
        status: 400,
      },
    );

  const poll = await db.poll.delete({
    where: {
      id,
    },
  });

  if (!poll)
    return NextResponse.json(
      { msg: "This poll is not found" },
      { status: 404 },
    );

  return NextResponse.json({ msg: "Poll deleted!" }, { status: 200 });
};
