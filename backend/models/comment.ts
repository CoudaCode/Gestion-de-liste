import { model, Document, Schema, Types } from "mongoose";
import { User } from "./users";

interface IComment extends Document {
  auteur: Types.ObjectId | string;
  content: string;
  dateAjout: Date;
  livreID: string;
}

const CommentModel = new Schema<IComment>({
  auteur: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  livreID: {
    required: true,
    type: String,
  },
  dateAjout: {
    type: Date,
    defaut: Date.now,
  },
});

const Comment = model("Comment", CommentModel);

export { Comment, IComment };
