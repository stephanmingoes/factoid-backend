import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  fact: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const PostMessage = mongoose.model("PostMessage", postSchema);
