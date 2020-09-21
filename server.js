const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 8000;

const AuthRoute = require("./routes/auth");
const PostRoute = require("./routes/post");
const ProfileRoute = require("./routes/profile");
const UserRoute = require("./routes/user");

const db = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use("/users", UserRoute);
app.use("/auth", AuthRoute);
app.use("/post", PostRoute);
app.use("/profile", ProfileRoute);

db.once("open", () => {
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log("listening at ", port);
  });
});
