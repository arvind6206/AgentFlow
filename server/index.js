import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();

  console.log(`Server is listening on http://localhost:${PORT}`);
});
