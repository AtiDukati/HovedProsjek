import express from "express";
import { hash } from "./crypto.mjs";
// import Joke from "./node_modules/jokemaster/joke.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";
import sqlActions from "./database.mjs";
//import createToken from "./JWT.mjs";
import { createToken, decodeToken } from "./JWT.mjs";

const server = express();

const port = process.env.PORT || 8080;
console.log(`Running port`, port);

server.set("port", port);
server.use(express.json());
server.use(express.static("public"));

// server.get("/getUserProfile/", (req, res, next) =>{

// } );

// server.get("/getJokeNo/:index", (req, res, next) => {
//   const lang = TLanguage("No");
//   const joke = new Joke(lang[0]).tellAJoke(req.params.index);

//   res.json({ joke: joke, elements: lang[1] }).end();
// });

// server.get("/getJokeEn/:index", (req, res, next) => {
//   const lang = TLanguage("En");
//   const joke = new Joke(lang[0]).tellAJoke(req.params.index);

//   res.json({ joke: joke, elements: lang[1] }).end();
// });

server.post("/login", async (req, res) => {
  //let loginUser = new sqlActions().loginCheck(req.body.username, hash(req.body.password));

  const basicSplit = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(basicSplit, "base64")
    .toString("UTF-8")
    .split(":");
  //console.log(basicSplit);

  let loginUser = new sqlActions();
  let user = await loginUser.loginCheck(decoded[0], hash(decoded[1]));

  //console.log(req.headers);

  if (user !== null) {
    res.status(200);
    const token = createToken(decoded[0]);
    res.json(token).end();

    // res.json(loginUser.body)
    // console.log(res);
  } else {
    // loginUser = "";
    // user = "";
    res.status(403).end();
  }
  //console.log(req.body);
});

server.post("/registerUser", async (req, res, next) => {
  let newUser = new sqlActions();
  let user = await newUser.registerNewUser(
    req.body.username,
    hash(req.body.password)
  );

  // console.log(hash(req.body.password));
  //console.log(req.body);

  if (req.body.username !== "" && req.body.password !== "") {
    res.status(200).end();
  } else {
    res.status(403).end();
  }
});



server.post("/submitScore", async (req, res) => {
  const username = decodeToken(req.body.token);
  //console.log(username);

  let newScore = new sqlActions();
  let score = await newScore.submitScore(username, req.body.score);

  console.log(req.body.score);
  res.status(200).end();
});

server.get("/scorboard", async (req, res)=>{

  let scoreboard = new sqlActions();
  let scores = await scoreboard.showAll()
  console.log(scores);
  res.status(200).json(scores).end();


});

server.post("/getProfile", async (req, res) => {

  // const username = decodeToken(req.body.token);
  // console.log(username);
  
  // let profileScoreboard = new sqlActions();
  // let scores = await profileScoreboard.showAllProfile(username)
  // console.log(scores);
  // res.status(200).json(scores).end();

  // res.json(user).end();
});

server.listen(server.get("port"), () => {});
