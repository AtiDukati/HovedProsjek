import express from "express";
import hash from "./crypto.mjs";
// import Joke from "./node_modules/jokemaster/joke.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";
import profiles from "./profiles.json" assert { type: "json" };
import sqlActions from "./database.mjs";

const server = express();

const port = process.env.PORT || 8080;
console.log(`Running port`, port);

server.set("port", port);
server.use(express.json());
server.use(express.static("public"));

// server.get("/getUserProfile/", (req, res, next) =>{

// } );

server.get("/getProfile", (req, res) => {
  let user = profiles;

  res.json(user).end();
});

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

  let loginUser = new sqlActions();
  let user = await loginUser.loginCheck(req.body.username, hash(req.body.password));
  
  console.log(user);

  if (user !== null) {
    res.status(200);
    res.json(user).end();

    // res.json(loginUser.body)
    // console.log(res);
  } else {
    res.status(403).end();
  }
  //console.log(req.body);
});

server.post("/registerUser", async (req, res, next) => {
  let newUser = new sqlActions();
  let user = await newUser.registerNewUser(req.body.username, hash(req.body.password));

  // console.log(hash(req.body.password));
  console.log(req.body);

  if (req.body.username !== "" && req.body.password !== "") {
    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

server.listen(server.get("port"), () => {});
