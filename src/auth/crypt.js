import { AES, enc } from "crypto-js";
export const encryptIt = (s) => {
  return AES.encrypt(s, import.meta.env.VITE_SECRET_KEY).toString();
};
export const decryptIt = (s) => {
  return AES.decrypt(s, import.meta.env.VITE_SECRET_KEY).toString(enc.Utf8);
};
