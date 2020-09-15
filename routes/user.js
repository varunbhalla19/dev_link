const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

const UserModel = require("../model/User");

router.get("/", authMiddleware, (req, res) => {
  const { userId } = req;

  return UserModel.findById(userId)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch((er) => {
      res
        .status(500)
        .send({ errors: [{ msg: er.message, customMsg: "User not found" }] });
    });
});

module.exports = router;