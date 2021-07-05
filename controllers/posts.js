import { PostMessage } from "../models/postMessage.js";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const postMessage = req.body;
  const newPost = new PostMessage({
    ...postMessage,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id exists.");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id exists.");

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id exists.");

  const post = await PostMessage.findById(id);
  const likecheck = post.likes.filter((id) => id === String(req.userId));

  if (likecheck.length === 0) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likes: post.likes },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};
export default router;
