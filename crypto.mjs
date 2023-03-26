const { createHmac } = await import("node:crypto");
const secret = "abcdefg";
import {tokenSecret} from "./localenv.mjs";

function hash(sourceText) {
  const hash = createHmac("sha256", secret).update(sourceText).digest("hex");

  return hash;
}

function hashToken(tokenString) {
    console.log(tokenSecret);
  const hash = createHmac("sha256", tokenSecret).update(tokenString, "utf-8").digest("base64");

  return hash;
}

export {hash, hashToken};
