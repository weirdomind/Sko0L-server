import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET || "mysecret";

// JSON Web Token
export const generateToken = (_id: ObjectId, name: string) => {
  const decoded: Decoded = {
    _id,
    name,
  };
  const token = jwt.sign(decoded, secret, {
    expiresIn: "2h",
  });
  return token;
};

interface Decoded {
  _id: ObjectId;
  name: string;
}

export const tokenDecoder = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret) as Decoded;
    return decoded;
  } catch (error) {
    return {
      _id: null,
      name: null,
    };
  }
};

console.log(tokenDecoder(""));
