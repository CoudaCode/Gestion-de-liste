import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getLivre } from "../api/livre";
type LivreType = {
  _id: string;
  title: string;
  auteur: string;
  content: string;
  comment: string[];
  genre: string;
  pages: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [livre, setLivre] = useState<LivreType | null>(null);

  useQuery(["Livre", id], () => getLivre(id), {
    onSuccess: (data) => {
      setLivre(data.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div>
      Author: {livre?.auteur} <br />
      Title: {livre?.title} <br />
      Content: {livre?.content} <br />
      Genre: {livre?.genre} <br />
      Pages: {livre?.pages} <br />
      Created At: {livre?.createdAt} <br />
      Updated At: {livre?.updatedAt} <br />
    </div>
  );
};

export default BookDetails;
