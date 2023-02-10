import express from "express"; //import express from node_modules
import Joke from "./node_modules/jokemaster/joke.mjs"; //importere jokes
import TLanguage from "./node_modules/languageModul/module1.mjs";

const server = express();

const port = process.env.PORT || 8080;

server.set("port", port);

server.use(express.static("public"));

//const jokeTeller = new Joke(new TLanguage("No"));

server.get("/getJokeNo/:index", (req, res, next) => {
  //console.log("getting joke");
  const lang = TLanguage("No")
  const joke = new Joke(lang[0]).tellAJoke(req.params.index);
  //joke = joke.tellAJoke();

  res.json({ joke: joke, elements: lang[1] }).end();
});

server.get("/getJokeEn/:index", (req, res, next) => {
  const lang = TLanguage("En")
  const joke = new Joke(lang[0]).tellAJoke(req.params.index);
  //joke = joke.tellAJoke();

  res.json({ joke: joke, elements: lang[1] }).end();
});

server.listen(server.get("port"), () => {
  //   console.log(`server running ${server.get("port")}`);
  //   console.log(Dictionary);
  //console.log(jokeTeller.getJokeIndex());
});
