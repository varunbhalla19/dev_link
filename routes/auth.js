const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const ProfileModel = require("../model/Profile");

router.get("/", (req, res) => res.send("Auth Route"));

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid Email"),
    body("password").notEmpty().withMessage("Password is required (Ofcourse!)"),
  ],
  (req, res) => {
    console.log("POST /login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors);
    } else {
      const { email, password } = req.body;
      UserModel.findOne({ email })
        .then((user) => {
          if (user) {
            console.log("user exists");
            return bcrypt
              .compare(password, user.password)
              .then((result) => {
                if (result) {
                  console.log("result is ", result);
                  const payload = { id: user.id };
                  return jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    (er, token) => {
                      if (er) {
                        return res.status(500).json({
                          error: [
                            {
                              msg: er.message,
                              customMsg: "Token Signing failed",
                            },
                          ],
                        });
                      }
                      console.log("token is ", token);
                      return res.status(200).json({ user: user, token: token });
                    }
                  );
                } else {
                  res.status(401).json({
                    errors: [
                      {
                        msg: "Wrong Credentials",
                      },
                    ],
                  });
                }
              })
              .catch((er) => {
                return res.status(400).json({
                  errors: [
                    {
                      msg: er.message,
                      customMsg: "Err while comparing passwords",
                    },
                  ],
                });
              });
          } else {
            return res.status(400).json({
              errors: [{ msg: "Wrong Credentials" }],
            });
          }
        })
        .catch((er) => {
          return res.status(400).json({
            errors: [
              {
                msg: er.message,
                customMsg: "Err Querying DB",
              },
            ],
          });
        });
    }
  }
);

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("name field must not be empty"),
    body("email").isEmail().withMessage("Must be a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have length atleast 6"),
  ],
  (req, res) => {
    console.log("POST /signup");
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
                return UserModel.create({
                  name,
                  email,
                  password: hash,
                  picName: "",
                })
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
                        ProfileModel.create({ user: savedUser._id }).then(
                          (newProf) => {
                            res
                              .status(200)
                              .send({ user: savedUser, token: token });
                          }
                        );
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
