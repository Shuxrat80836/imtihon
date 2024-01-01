import bcrypt from "bcrypt";
const salt = 10;
export const encrypt = (data) => {
  return bcrypt.hashSync(data, salt);
};
export const compare = (data, encryptedData) => {
  return bcrypt.compare(data, encryptedData);
};
