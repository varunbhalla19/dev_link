const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => res.send("User Route"));

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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(200).send(req.body);
    }else {
        return res.status(422).send(errors)
    }
  }
);

module.exports = router;
