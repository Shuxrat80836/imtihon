import jwt from "jsonwebtoken";
const jwtKey = "secret";
export const jwtSign = (data) => {
  return jwt.sign(data, jwtKey);
};

export const verify = (token) => {
  return jwt.verify(token, jwtKey);
};
