const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// cors

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "good",
  });
});

app.post("/register", (req, res) => {
  const name = req.body.username;
  res.json({
    name: name,
  });
});

app.get("/register2", (req, res) => {
  const name = req.body.username;
  res.json({
    name: name,
  });
});

app.get("/register3", (req, res) => {
  // const name = req.body.username;
  res.json({
    name: "Get work properly!",
  });
});

const PORT = 5000 || process.env.PORT;

app.listen(5000, () => {
  console.log("Active On PORT 5000");
});
