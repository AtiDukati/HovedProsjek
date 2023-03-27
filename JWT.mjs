import { hash, hashToken } from "./crypto.mjs";

function createToken(payload) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader =  base64UrlEncoding(header);

  const encodedPayload = base64UrlEncoding(payload);

  const signatureString = `${encodedHeader}.${encodedPayload}`;

  const signature64 = hashToken(signatureString);

  const signatureBuffer = Buffer.from(signature64, "base64");

  const signature = signatureBuffer.toString("base64url");

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  return token;

};

function base64UrlEncoding(rawData) {

    const rawString = JSON.stringify(rawData);
    const buffer = Buffer.from(rawString, "utf-8");
    const encode = buffer.toString("base64url");

    return encode;
};


function decodeToken(token) {
  const tokenParts = token.split(".");
  const payload = JSON.parse(Buffer.from(tokenParts[1], "base64url").toString());
  const username = payload;
  
  return username
};



//export default createToken;
export {createToken, decodeToken}
