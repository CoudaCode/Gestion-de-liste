import { Document, Schema, Types, model } from "mongoose";

interface ILivre extends Document {
  _id: string;
  title: string;
  auteur: Types.ObjectId | string;
  genre: string;
  comment: Types.ObjectId[];
  pages: number;
  content: string;
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
    default: [],
  },
  pages: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateAjout: {
    type: Date,
    default: Date.now(),
  },
  dateModif: {
    type: Date,
    default: Date.now(),
  },
});

const Livre = model("Livre", LivreModel);

export { ILivre, Livre };

/*
{
  "title": "Le Seigneur des Anneaux : La Communauté de l'Anneau",
  "auteur": "616b51eb016e312234fa22cf",
  "genre": "Fantasy",
  "comment": [],
  "pages": 527,
  "content": "Quand M. Bilbo Sacquet de Cul-de-Sac annonça qu'il laissait tous ses biens à son neveu le jeune Frodon, on ne put qu'être surpris et mécontent.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}


{
  "title": "L'Étranger",
  "auteur": "616b51eb016e312234fa22ce",
  "genre": "Roman philosophique",
  "comment": [],
  "pages": 123,
  "content": "Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}


{
  "title": "Les Misérables",
  "auteur": "616b51eb016e312234fa22cd",
  "genre": "Roman historique",
  "comment": ["616b51eb016e312234fa22ce"],
  "pages": 1488,
  "content": "En 1815, M. Charles-François-Bienvenu Myriel était évêque de Digne.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}


{
  "title": "Orgueil et Préjugés",
  "auteur": "616b51eb016e312234fa22cf",
  "genre": "Roman classique",
  "comment": [],
  "pages": 279,
  "content": "C'est une vérité universellement reconnue qu'un célibataire pourvu d'une belle fortune doit avoir envie de se marier.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}

{
  "title": "Le Comte de Monte-Cristo",
  "auteur": "616b51eb016e312234fa22ce",
  "genre": "Aventure",
  "comment": [],
  "pages": 1232,
  "content": "Le 24 février 1815, la vigie de Notre-Dame de la Garde signala le trois-mâts le Pharaon, venant de Smyrne, Trieste et Naples.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}

{
  "title": "Moby Dick",
  "auteur": "616b51eb016e312234fa22cd",
  "genre": "Roman d'aventure",
  "comment": ["616b51eb016e312234fa22ce", "616b51eb016e312234fa22cf"],
  "pages": 625,
  "content": "Call me Ishmael. Some years ago — never mind how long precisely — having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}

{
  "title": "Les Fleurs du Mal",
  "auteur": "616b51eb016e312234fa22cf",
  "genre": "Poésie",
  "comment": [],
  "pages": 230,
  "content": "La tête posée sur mon bras, je regarde",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}


{
  "title": "La Guerre et la Paix",
  "auteur": "616b51eb016e312234fa22cd",
  "genre": "Roman historique",
  "comment": [],
  "pages": 1424,
  "content": "Bien des personnages historiques, des personnages publics et des personnages privés, des bureaucrates et des généraux, s'efforcèrent de diriger les événements; mais aucun ne put rien contre l'effort incessant de la vie, contre l'effet continu du flux et du reflux, des forces anonymes, incessantes, énormes, qu'on sent parfois et qu'on ne voit jamais.",
  "dateAjout": "2024-03-01T12:00:00.000Z",
  "dateModif": "2024-03-01T12:00:00.000Z"
}



*/
