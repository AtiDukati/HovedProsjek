import express from "express"; //import express from node_modules
import Joke from "./node_modules/jokemaster/joke.mjs"; //importere jokes
//import Dictionary from "./node_modules/languageModul/Dictionary.mjs";
import TLanguage from "./node_modules/languageModul/module1.mjs";

const server = express();

const port = process.env.PORT || 8080;

server.set("port", port);

server.use(express.static("public"));

//const jokeTeller = new Joke(new TLanguage("No"));

server.get("/getJokeNo", (req, res, next) => {
  //console.log("getting joke");
  const joke = new Joke(new TLanguage("No")).tellAJoke();
    //joke = joke.tellAJoke();

  res.json({ joke: joke }).end();
});

server.get("/getJokeEn", (req, res, next) => {
    //console.log("getting joke");
    const joke = new Joke(new TLanguage("En")).tellAJoke();
      //joke = joke.tellAJoke();
  
    res.json({ joke: joke }).end();
  });



server.listen(server.get("port"), () => {
  //   console.log(`server running ${server.get("port")}`);
  //   console.log(Dictionary);
  //console.log(jokeTeller.getJokeIndex());
});
