const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    active: true,
    creator: "Subhranshu Choudhury",
    profiles: [
      "https://github.com/subhranshuchoudhury",
      "https://about.me/subhranshu",
    ],
    contacts: ["Phone: +91 8249587552", "Mail: subhransuchoudhury00@gmail.com"],
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const options = {
    method: "POST",
    headers: {
      Cookie: "JSESSIONID=919d191178f678f5cc8b0c629037",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: `{"username": "${username}","password": "${password}","MemberType":"s"}`,
  };

  await fetch("http://115.240.101.71:8282/CampusPortalSOA/login", options)
    .then((response) => response.json())
    .then((response) => res.send(response))
    .catch((err) => res.send({ error: true }));
});

app.get("/info", async (req, res) => {
  const options2 = {
    method: "POST",
    headers: { Cookie: "JSESSIONID=919d191178f678f5cc8b0c629037" },
  };

  await fetch(
    "http://115.240.101.71:8282/CampusPortalSOA/studentinfo",
    options2
  )
    .then((response) => response.json())
    .then((response) => res.send(response))
    .catch((err) => res.send({ error: true }));
});

app.get("/attendinfo", async (req, res) => {
  const options = {
    method: "POST",
    headers: { Cookie: "JSESSIONID=919d191178f678f5cc8b0c629037" },
    body: '{"registerationid":"ITERRETD2209A0000001"}',
  };

  fetch("http://115.240.101.71:8282/CampusPortalSOA/attendanceinfo", options)
    .then((response) => response.json())
    .then((response) => res.send(response))
    .catch((err) => res.send({ error: true }));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Active on PORT 8000");
});
