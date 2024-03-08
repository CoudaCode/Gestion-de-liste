export interface LivreType {
  _id?: string;
  comment?: [];
  __v?: number;
  title: string;
  auteur: string;
  genre: string;
  pages: number;
  content: string;
  dateAjout: string;
  dateModif: string;
}

export interface livreResponse {
  statut: boolean;
  message: LivreType | LivreType[] | string;
}
