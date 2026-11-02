import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors'
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(cookieParser())

app.use('/api/auth', authRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();

  console.log(`Server is listening on http://localhost:${PORT}`);
});
