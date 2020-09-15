const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth");
const UserModel = require("../model/User");
const Postmodel = require("../model/Post");
const { post } = require("./profile");

router.post("/", authMiddleware, (req, res) => {
  const userId = req.userId;
  Postmodel.create({
    content: req.body.content,
    title: req.body.title,
    user: userId,
  })
    .then((post) => res.status(200).json(post))
    .catch((er) => res.status(500).json({ msg: er.message }));
});

router.get("/", authMiddleware, (req, res) => {
  Postmodel.find()
    .populate("user", ["name", "email"])
    .then((posts) => res.json(posts))
    .catch((er) => res.status(500).json({ msg: er.message }));
});

router.get("/:id", authMiddleware, (req, res) => {
  Postmodel.findById(req.params.id)
    .populate("user", ["name", "email"])
    .then((posts) =>
      posts
        ? res.json(posts)
        : res.status(500).json({
            msg: "No Post found",
          })
    )

    .catch((er) =>
      er.kind === "ObjectId"
        ? res.status(500).json({
            msg: "No Post found",
          })
        : res.status(500).json({
            msg: er.message,
            customMsg: "Err fetching Post",
          })
    );
});

router.delete("/:id", authMiddleware, (req, res) => {
  Postmodel.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(500).json({ msg: "Post not found" });
      }
      if (post.user.toString() === req.userId) {
        return post
          .remove()
          .then((post) => res.json({ msg: "Deleted Successfully" }));
      } else {
        res.status(422).json({
          msg: "Not Authorized to Delete",
        });
      }
    })
    .catch((er) =>
      res.status(500).json({
        msg: er.message,
        customMsg: "Err Deleting Post",
      })
    );
});

router.put("/likeUnlike/:id", authMiddleware, (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  Postmodel.findById(postId)
    .then((post) => {
      let theLike = post.likes.findIndex(
        (like) => like.user.toString() === userId
      );
      if (theLike >= 0) {
        console.log("already liked");
        post.likes.splice(theLike, 1);
      } else {
        console.log("not liked yet");
        post.likes.push({ user: userId });
      }
      post.save().then((p) => res.json(p));
    })
    .catch((er) =>
      res.status(500).json({
        msg: er.message,
        customMsg: "Err Liking/UnLiking Post",
      })
    );
});

router.put("/comment/:postId", authMiddleware, (req, res) => {
  const postId = req.params.postId,
    userId = req.userId;
  const commentObject = { content: req.body.content, user: userId };
  Postmodel.findByIdAndUpdate(
    postId,
    { $push: { comments: commentObject } },
    { new: true }
  )
    .then((profM) =>
      profM ? res.json(profM) : res.json({ msg: "Post doesn't exist" })
    )
    .catch((er) =>
      res.status(500).json({
        msg: er.message,
        customMsg: "Err Adding Comment",
      })
    );
});

router.delete("/:postId/comment/:commentId", authMiddleware, (req, res) => {
  const { postId, commentId } = req.params,
    userId = req.userId;

  return Postmodel.findById(postId)
    .then((post) => {
      let comIndex = post.comments.findIndex((com) => com.id === commentId);
      console.log(comIndex);
      if (comIndex > -1) {
        if (post.comments[comIndex].user.toString() === userId) {
          post.comments.splice(comIndex, 1);
          post.save().then((newPost) => res.json(newPost));
        } else {
          res.status(422).json({ msg: "User not authorized for action" });
        }
      } else {
        res.status(422).json({ msg: "Comment Not found!" });
      }
    })
    .catch((er) =>
      res.status(500).json({
        msg: er.message,
        customMsg: "Couldn't find such post",
      })
    );
});

module.exports = router;
