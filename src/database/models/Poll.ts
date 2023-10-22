import { TOptions } from "@/types/types";
import mongoose, { Schema, Document, models, model } from "mongoose";

interface PollOption {
  id: string; // This should be a string, not a number
  // Other fields for your poll option
}

interface Poll extends Document {
  title: string;
  options: PollOption[];
  userName: string;
  id: string; // This should be a string, not a number
}

const pollOptionSchema = new Schema<TOptions>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  votes: { type: Number, required: true },
  // Other fields for your poll option
});

const pollSchema = new Schema<Poll>({
  title: { type: String, required: true },
  options: [pollOptionSchema],
  userName: { type: String, required: true },
  id: { type: String, required: true },
});

export const PollModel = models.Polls ?? model("Polls", pollSchema);

export { PollModel as PollSchema };
