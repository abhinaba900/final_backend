const express = require("express");
const postRouter = express.Router();
const Post = require("../Modles/post.Modle");
const authMiddleware = require("../Middleware/auth.Middleware");
var useragent = require("express-useragent");
const User = require("../Modles/user.Modle");

postRouter.use(useragent.express());

postRouter.post("/add", authMiddleware, async (req, res) => {
  const { title, body, userId } = req.body;

  //   const userId = req.user._id;

  if (!title || !body) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const deviceType = req.useragent.isMobile
    ? "MOBILE"
    : req.useragent.isTablet
    ? "TABLET"
    : "PC";

  try {
    const post = new Post({
      title,
      body,
      device: deviceType,
      userId: userId,
    });
    await post.save();

    await User.updateOne({ _id: userId }, { $push: { posts: post._id } });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post", error });
  }
});
postRouter.get("/", authMiddleware, async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await Post.find({ userId });
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

postRouter.patch("/update/:id", authMiddleware, async (req, res) => {
    try {
        const findPost = await Post.findOne({ _id: req.params.id });
        const { title, body } = req.body;
        
        if (!findPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        else{
            const updatedPost = await Post.updateOne({ _id: req.params.id }, { $set: { title, body } });
            res.status(200).send(updatedPost);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
})

postRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const findPost = await Post.findOne({ _id: req.params.id });
        if (!findPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        else{
            const deletedPost = await Post.deleteOne({ _id: req.params.id });
            res.status(200).send(deletedPost);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = postRouter;
