import dotenv from "dotenv";
dotenv.config();
export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: 3001,
};
