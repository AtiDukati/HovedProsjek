import express from "express";
import { hash } from "./crypto.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";
import sqlActions from "./database.mjs";
import { createToken, decodeToken } from "./JWT.mjs";

const server = express();

const port = process.env.PORT || 8080;
console.log(`Running port`, port);

server.set("port", port);
server.use(express.json());
server.use(express.static("public"));

server.get("/getNo", async (req, res) => {
  let langNo = TLanguage("No");

  res.json(langNo).end();
});

server.get("/getEn", async (req, res) => {
  let langEn = TLanguage("En");

  res.json(langEn).end();
});
//=======================================LOGIN========================================================================
server.post("/login", async (req, res) => {
  const basicSplit = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(basicSplit, "base64")
    .toString("UTF-8")
    .split(":");

  let loginUser = new sqlActions();
  let user = await loginUser.loginCheck(decoded[0], hash(decoded[1]));

  if (user !== null) {
    res.status(200);
    const token = createToken(decoded[0]);
    res.json(token).end();
  } else {
    res.status(403).end();
  }
});

//=======================================DELETE USER========================================================================
server.delete("/deleteUser", async (req, res) => {
  const username = decodeToken(req.body.token);

  let dbActions = new sqlActions();
  let deletedUser = await dbActions.deleteUser(username);
});

//=======================================REGISTER USER========================================================================
server.post("/registerUser", async (req, res, next) => {
  let newUser = new sqlActions();
  let user = await newUser.registerNewUser(
    req.body.username,
    hash(req.body.password)
  );

  if (req.body.username !== "" && req.body.password !== "") {
    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

//=======================================SUBMIT SCORE========================================================================

server.post("/submitScore", async (req, res) => {
  const username = decodeToken(req.body.token);

  let newScore = new sqlActions();
  let score = await newScore.submitScore(username, req.body.score);

  res.status(200).end();
});

//=======================================GET LEADER BOARD========================================================================
server.get("/scorboard", async (req, res) => {
  let scoreboard = new sqlActions();
  let scores = await scoreboard.showAll();
  res.status(200).json(scores).end();
});

//=======================================GET PROFILE SCORES========================================================================
server.get("/getProfile", async (req, res) => {
  let userName = decodeToken(req.headers.authorization.split(" ")[1]);

  let profile = new sqlActions();
  let profileScore = await profile.showAllProfile(userName);

  res.status(200).json(profileScore).end();
});

server.listen(server.get("port"), () => {});
