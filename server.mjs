import express from "express"; //import express from node_modules
import Joke from "./node_modules/jokemaster/joke.mjs"; //importere jokes

const server = express();

const port = process.env.PORT || 8080;

server.set("port", port);

server.use(express.static("public"));

const jokes = [
  "How many programmers does it take to change a light bulb? None – It’s a hardware problem",
  "Why is gravity everywhere? Because it is mass-produced",
];

const jokeTeller = new Joke(jokes);

server.get("/getJoke", (req, res, next)=>{
    console.log("getting joke");
    const joke = jokeTeller.tellAJoke();
    res.json({joke: joke}).end();
});


server.listen(server.get("port"), () => {
  console.log(`server running ${server.get("port")}`);
  console.log(jokeTeller);
});
