import { model, Types, Schema, Document } from "mongoose";

interface ILivre extends Document{
  _id: string;
  title: string;
  auteur: Types.ObjectId | string;
  genre: string;
  comment: Types.ObjectId[];
  pages: number;
  content:string;
  dateAjout: Date;
  dateModif: Date;
}

const LivreModel = new Schema<ILivre>({
  title: {
    type: String,
    required: true,
  },
  auteur: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  genre: {
    required: true,
    type: String,
  },
  comment: {
    type: [{ ref: "Comment", type: Schema.Types.ObjectId }],
    default:[]
  },
  pages: {
    type: Number,
    required: true,
  },
  content:{
    type:String,
    required:true
  },
  dateAjout: {
    type: Date,
    default: Date.now()
  },
  dateModif: {
    type: Date,
    default: Date.now()
  }
});


const Livre = model("Livre", LivreModel)

export {Livre, ILivre}