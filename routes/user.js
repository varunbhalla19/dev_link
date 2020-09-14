const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const authMiddleware = require("../middleware/auth");

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

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("name field must not be empty"),
    body("email").isEmail().withMessage("Must be a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have length atleast 6"),
  ],
  (req, res) => {
    console.log("POST /users");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors);
    } else {
      const { name, email, password } = req.body;
      return UserModel.findOne({ email: email })
        .then((data) => {
          if (!data) {
            return bcrypt.hash(password, 5, (er, hash) => {
              if (!er) {
                console.log("hashed password ", hash);
                return UserModel.create({ name, email, password: hash })
                  .then((savedUser) => {
                    console.log("saved user ", savedUser);
                    const payload = { id: savedUser.id };
                    jwt.sign(
                      payload,
                      process.env.JWT_SECRET,
                      // { expiresIn: "7d" },
                      (er, token) => {
                        if (er) {
                          return res
                            .status(500)
                            .send({ error: [{ msg: er.message }] });
                        }
                        console.log("token is ", token);
                        res.status(200).send({ user: savedUser, token: token });
                      }
                    );
                  })
                  .catch((er) => {
                    res.status(500).send({
                      errors: [
                        { msg: er.message, customMsg: "Err saving User" },
                      ],
                    });
                  });
              } else {
                console.log("Hashing Er");
                return res.status(500).send({
                  errors: [{ msg: er.message, customMsg: "Hashing Err" }],
                });
              }
            });
          } else {
            res
              .status(400)
              .send({ errors: [{ msg: "Email already exists!" }] });
          }
        })
        .catch((er) => {
          res
            .status(500)
            .send({ errors: [{ msg: er.message, customMsg: "Db Err" }] });
        });
    }
  }
);

module.exports = router;
