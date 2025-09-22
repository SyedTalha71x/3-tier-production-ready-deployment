import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export const hashpassword = (password) =>{
  const hashpassword = CryptoJS.HmacSHA256(password, process.env.KEY).toString();
  return hashpassword;
}
export const verifyPassword = (Storedhash, password) =>{
  const hash = CryptoJS.HmacSHA256(password, process.env.KEY).toString();
  return hash === Storedhash
}
export const generateToken = (userId, email, authType) => {
  const payload = { userId, email, authType };
  try {
    const token = jwt.sign(payload, process.env.KEY);
    return token;
  } catch (error) {
    console.log(error);
  }
};

