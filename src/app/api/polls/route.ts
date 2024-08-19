import { optionSchema } from "@/components/createpollform/CreatePollForm";
import { db } from "@/database/db";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ msg: "User not found" }, { status: 401 });

  const polls = await db.poll.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
    include: {
      options: true,
    },
  });

  return NextResponse.json(polls);
};

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  const data: { title: string; options: z.infer<typeof optionSchema> } =
    await request.json();

  if (!data.title || !data.options || data.options.length === 0) {
    return NextResponse.json({ msg: "Invalid data" }, { status: 400 });
  }

  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ msg: "User email not found" }, { status: 401 });
  }

  const pollId = uuid();

  const options = data.options;
  const optionIds = options.map((option) => option.id);

  const existingOptions = await db.pollOption.findMany({
    where: {
      id: { in: optionIds },
    },
  });

  const existingOptionIds = existingOptions.map((option) => option.id);

  const optionsToCreate = options.filter(
    (option) => !existingOptionIds.includes(option.id),
  );

  await db.pollOption.createMany({
    data: optionsToCreate.map((option) => ({
      id: option.id,
      name: option.name,
      votes: 0,
      pollId: pollId,
    })),
  });

  const allOptions = await db.pollOption.findMany({
    where: {
      id: { in: optionIds },
    },
  });

  await db.poll.create({
    data: {
      id: pollId,
      title: data.title,
      options: {
        connect: allOptions.map((option) => ({ id: option.id })),
      },
      User: {
        connectOrCreate: {
          create: {
            email: userEmail,
          },
          where: {
            email: userEmail,
          },
        },
      },
    },
  });

  return NextResponse.json({ msg: "Success", id: pollId }, { status: 200 });
};
