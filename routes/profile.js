const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth");
const ProfileModel = require("../model/Profile");
const UserModel = require("../model/User");

router.get("/me", authMiddleware, (req, res) => {
  return ProfileModel.findOne({ user: req.userId })
    .populate("user", ["name", "email", "picName"])
    .then((profile) =>
      profile
        ? res.status(200).json(profile)
        : res.status(400).json({ msg: "Profile not found for this User" })
    )
    .catch((er) => {
      return res.status(500).json({
        msg: er.msg,
        customMsg: "Err while querying DB",
      });
    });
});

router.post(
  "/",
  [
    body("skills").notEmpty().withMessage("Get some Skills"),
    body("githubUsername")
      .notEmpty()
      .withMessage("Provide or Make a Github account atleast!"),
  ],
  authMiddleware,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors);
    }
    const id = req.userId;
    const profileObj = {
      user: id,
      company: req.body.company,
      website: req.body.website,
      location: req.body.location,
      status: req.body.status,
      skills: req.body.skills || [],
      bio: req.body.bio,
      githubUsername: req.body.githubUsername,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      picName: req.body.picName,
    };
    return ProfileModel.findOneAndUpdate(
      { user: id },
      { $set: profileObj },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((newProf) => {
        console.log(newProf);
        res.status(200).json(newProf);
      })
      .catch((er) => {
        res.status(500).json({
          errors: [
            {
              msg: er.message,
              customMsg: "Err Creating or Updating Profile",
            },
          ],
        });
      });
  }
);

router.get("/", (req, res) => {
  return ProfileModel.find()
    .populate("user", ["name", "email", "id", "picName"])
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((er) => {
      res.status(500).json({
        errors: [
          {
            msg: er.message,
            customMsg: "Err while fetching Profiles",
          },
        ],
      });
    });
});

router.get("/user/:id", (req, res) => {
  return ProfileModel.findOne({ user: req.params.id })
    .populate("user", ["name", "email", "id","picName"])
    .then((profile) => {
      profile
        ? res.status(200).json(profile)
        : res.status(500).json({ msg: "No Profile of this User found" });
    })
    .catch((er) => {
      // console.log('er is ',er);
      er.kind === "ObjectId"
        ? res.status(500).json({
            errors: { msg: "No Profile of this User found" },
          })
        : res.status(500).json({
            msg: er.message,
            customMsg: "Err while fetching Profile",
          });
    });
});

router.delete("/", authMiddleware, (req, res) => {
  console.log("id is ", req.userId);
  ProfileModel.findOneAndRemove({ user: req.userId })
    .then((prof) =>
      UserModel.findByIdAndRemove(req.userId).then(() => {
        console.log("Deleted");
        res.status(200).json({
          msg: "Deleted!",
        });
      })
    )
    .catch((er) => {
      res.status(500).json({
        errors: [
          {
            msg: er.message,
            customMsg: "Err while Deleting",
          },
        ],
      });
    });
});

router.put("/experience", authMiddleware, (req, res) => {
  const expObj = {
    title: req.body.title,
    company: req.body.company,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description,
  };
  console.log(expObj);
  ProfileModel.findOneAndUpdate(
    { user: req.userId },
    { $push: { experience: expObj } },
    { new: true }
  )
    .then((profOb) => {
      console.log("updated object ", profOb);
      res.status(200).json(profOb);
    })
    .catch((er) => {
      res.status(500).json({
        errors: [
          {
            msg: er.message,
            customMsg: "Err while Deleting",
          },
        ],
      });
    });
});

router.delete("/experience/:id", authMiddleware, (req, res) => {
  const expId = req.params.id,
    userId = req.userId;
  ProfileModel.findOneAndUpdate(
    { user: userId },
    { $pull: { experience: { _id: expId } } },
    { new: true }
  )
    .then((prof) => {
      res.status(200).json(prof);
    })
    .catch((er) => {
      res.status(500).json({
        errors: [
          {
            msg: er.message,
            customMsg: "Err Deleting Experience",
          },
        ],
      });
    });
});

// router.get("/repos/:username", authMiddleware, (req, res) => {});

module.exports = router;
