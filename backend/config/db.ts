import { connect } from "mongoose";
import { inProduction } from "./env";
export const connectDb = async () => {
  const secret = process.env.mongo_uri;
  if (!secret) throw new Error("verifié url mongo");
  await connect(secret, {
    dbName: inProduction ? "gestionDelivre" : "gestionDelivre_test",
  });
};
