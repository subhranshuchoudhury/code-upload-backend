const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// cors

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${process.env.DB_URL}`);
app.get("/", (req, res) => {
  res.json({
    status: 200,
  });
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  login: String,
  codes: [
    {
      code: String,
      timestamp: String,
      language: String,
      assignment_no: String,
      q_no: String,
      q_title: String,
    },
  ],
});

const User = new mongoose.model("user", userSchema);
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username, password }, (err, data) => {
    if (data) {
      User.updateOne({ username }, { $set: { login: new Date() } }, (err) => {
        if (err) {
          res.json({
            status: 404,
            message: "something went wrong",
          });
        } else {
          res.json({
            status: 200,
            username: username,
            password: password,
            message: "user already exist",
          });
        }
      });
    } else {
      if (!err) {
        const newUser = new User({
          username: username,
          password: password,
        });
        newUser.save((err) => {
          if (err) {
            res.json({
              status: 500,
              message: "something went wrong",
            });
          } else {
            res.json({
              status: 200,
              username: username,
              password: password,
            });
          }
        });
      } else {
        res.json({
          status: 404,
          message: "something went wrong",
        });
      }
    }
  });
});

app.post("/upload-code", (req, res) => {
  const code = req.body.code;
  const timestamp = req.body.timestamp;
  const language = req.body.language;
  const assignment_no = req.body.assignment_no;
  const q_no = req.body.q_no;
  const q_title = req.body.q_title;
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username, password }, (err, data) => {
    if (data) {
      User.updateOne(
        { username, password },
        {
          $push: {
            codes: {
              code: code,
              timestamp: timestamp,
              language: language,
              assignment_no: assignment_no,
              q_no: q_no,
              q_title: q_title,
            },
          },
        },
        (err) => {
          if (err) {
            res.json({
              status: 404,
              message: "something went wrong",
            });
          } else {
            res.json({
              status: 200,
              message: "code uploaded successfully",
            });
          }
        }
      );
    } else {
      res.json({
        status: 404,
        message: "user not found",
      });
    }
  });
});

app.get("/show-code/:username/:password", (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  User.findOne({ username, password }, (err, user) => {
    if (user) {
      res.send(user);
    } else {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: 404,
          message: "user not found",
        });
      }
    }
  });
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Active On PORT 5000");
});
