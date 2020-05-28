const express = require("express");
const multer = require("multer");

const multerConfig = require("./config/multer");
const Post = require("./models/Post");
const routes = express.Router();

routes.get("/posts", async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url,
  });

  res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  console.log(post);

  await Post.deleteOne();

  return res.send();
});

module.exports = routes;
