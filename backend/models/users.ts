import { Document, Schema, Types, model } from "mongoose";
interface IUser extends Document {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  contact: number;
  livre: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  livre: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Livre",
      },
    ],
    default: [],
  },
});

const User = model("User", UserSchema);
export { IUser, User };
