const mongoose = require("mongoose");

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
    experience: [
      {
        title: String,
        company: String,
        from: Date,
        to: Date,
        current: Boolean,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        field: String,
        from: Date,
        to: Date,
        current: Boolean,
      },
    ],
    social: {
      linkedin: String,
      facebook: String,
      twitter: String,
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);


module.exports = ProfileModel;
