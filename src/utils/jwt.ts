import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

// JSON Web Token
export const generateToken = (id: ObjectId, name: string) => {
  const token = jwt.sign(
    {
      id,
      name,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export const tokenDecode = (token: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
