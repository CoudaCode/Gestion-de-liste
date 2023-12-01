import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import { connectDb } from "./config/db";
import userRoutes from "./routes/users";
import commentRoutes from "./routes/comment";
import livreRoutes from "./routes/livre";
import { serve, setup } from "swagger-ui-express";
import swaggerFile from "./utils/swagger.json";
config({
  path: path.join(process.cwd(), ".env.local"),
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("bien connecté au port 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
app.use("/api/user", userRoutes);
app.use("/api/livre", livreRoutes);
app.use("/api/comment", commentRoutes);

app.use("/", serve, setup(swaggerFile));
