import express from "express";
import Joke from "./node_modules/jokemaster/joke.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";

const server = express();

const port = process.env.PORT || 8080;

server.set("port", port);

server.use(express.static("public"));


server.get("/getJokeNo/:index", (req, res, next) => {
  const lang = TLanguage("No")
  const joke = new Joke(lang[0]).tellAJoke(req.params.index);
  

  res.json({ joke: joke, elements: lang[1] }).end();
  
});

server.get("/getJokeEn/:index", (req, res, next) => {
  const lang = TLanguage("En")
  const joke = new Joke(lang[0]).tellAJoke(req.params.index);

  res.json({ joke: joke, elements: lang[1] }).end();
});

server.listen(server.get("port"), () => {

});
