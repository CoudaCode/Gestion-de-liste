import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import path from "path";
import { serve, setup } from "swagger-ui-express";
import { connectDb } from "./config/db";
import commentRoutes from "./routes/comment";
import livreRoutes from "./routes/livre";
import userRoutes from "./routes/users";
import swaggerFile from "./utils/swagger.json";
config({
  path: path.join(process.cwd(), ".env.local"),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

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
app.use("/api/livres", commentRoutes);

app.use("/", serve, setup(swaggerFile));
