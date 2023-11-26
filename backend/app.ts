import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import { connectDb } from "./config/db";
import userRoutes from "./routes/users"
config({
  path: path.join(process.cwd(), ".env.local"),
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("bien connect a la db mongo");
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use("/user",userRoutes)
