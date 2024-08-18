import { optionSchema } from "@/components/createpollform/CreatePollForm";
import { db } from "@/database/db";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";

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

  // Extract the ids and names from the options array
  const options = data.options;
  const optionIds = options.map((option) => option.id);
  const optionNames = options.map((option) => option.name);

  // Fetch existing options to check which ones exist
  const existingOptions = await db.pollOption.findMany({
    where: {
      id: { in: optionIds }, // Find records with the given IDs
    },
  });

  // Extract existing option IDs
  const existingOptionIds = existingOptions.map((option) => option.id);

  // Determine which options need to be created
  const optionsToCreate = options.filter(
    (option) => !existingOptionIds.includes(option.id),
  );

  // Create missing options
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

  // Create the new poll with the connected options
  await db.poll.create({
    data: {
      id: pollId,
      title: data.title,
      options: {
        connect: allOptions.map((option) => ({ id: option.id })), // Connect all valid options
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
