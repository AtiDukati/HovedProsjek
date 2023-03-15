import express from "express";
//import pg from "pg";
// import Joke from "./node_modules/jokemaster/joke.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";

const server = express();

const port = process.env.PORT || 8080;
console.log(`Running port`, port);

server.set("port", port);
server.use(express.json());
server.use(express.static("public"));

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

  if (req.body.username !== "" && req.body.password !== "" ) {

    res.status(200).end();
    
  }else{
    res.status(403).end();
  }
  console.log(req.body);
});


server.listen(server.get("port"), () => {});
