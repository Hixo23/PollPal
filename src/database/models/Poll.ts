import { model, Schema, models } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

export const PollSchema = models.Polls ?? model("Polls", schema);
