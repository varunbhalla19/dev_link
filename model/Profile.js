const mongoose = require("mongoose");

const ExpSchema = new mongoose.Schema({
  title: String,
  company: String,
  from: Date,
  to: Date,
  current: Boolean,
  description: String,
});

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: String,
    website: String,
    location: String,
    status: String,
    skills: [String],
    bio: String,
    githubUsername: String,
    experience: [ExpSchema],
    // education: [
    //   {
    //     school: String,
    //     degree: String,
    //     field: String,
    //     from: Date,
    //     to: Date,
    //     current: Boolean,
    //   },
    // ],
    picName: String,
    linkedin: String,
    twitter: String,
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);

module.exports = ProfileModel;
