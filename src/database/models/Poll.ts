import { model, Schema, models } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
      id: {
        type: Number,
        default: 0,
      },
    },
  ],
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
