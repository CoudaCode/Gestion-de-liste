import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllLivre } from "../api/livre";
import Input from "../components/Input";
import Livre from "../components/Livre";
import { LivreType } from "../types/livre";
const Search: React.FC = () => {
  const router = useNavigate();

  const [livres, setLivres] = useState<LivreType[]>([]);
  const [filterBook, setFilterBook] = useState<LivreType[]>([]);

  const [search, setSearch] = useState("");

  const { register, handleSubmit } = useForm();
  // Initialisez livres comme un tableau vide
  const token = Cookies.get("usertoken");

  useQuery("livres", getAllLivre, {
    onSuccess: (data) => {
      if (data && Array.isArray(data?.message)) setLivres(data?.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (!token) {
      router("/login");
    }
  }, [router, token]);
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Recherche</h1>
      <div className="flex items-center justify-between">
        <Input
          label="recherche"
          type="text"
          register={register}
          name="search"
          id="search"
          placeholder="Rechercher un livre"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Rechercher
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Résultats
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {Array.isArray(livres) &&
          livres.map((livre: LivreType) => (
            <Livre
              key={livre?._id}
              title={livre?.title}
              auteur={livre?.auteur}
              description={livre?.content.substring(0, 20)}
              id={livre?._id as string}
            />
          ))}
      </div>
    </>
  );
};

export default Search;
