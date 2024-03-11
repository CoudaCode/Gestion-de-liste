import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getAllLivre } from "../api/livre";
import Input from "../components/Input";
import Livre from "../components/Livre";
import { LivreType } from "../types/livre";

const Search: React.FC = () => {
  const router = useNavigate();

  const [livres, setLivres] = useState<LivreType[]>([]);

  const [search, setSearch] = useState<string>("");

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
  const filterBooks = (searchValue: string) => {
    if (searchValue) {
      return livres.filter((livre) =>
        livre.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return livres;
  };

  useEffect(() => {
    if (!token) {
      router("/login");
    }

    const filteredBooks = filterBooks(search);
    setLivres(filteredBooks);
  }, [router, token, search]);

  const onSubmit = (data) => {
    // Validez la valeur de recherche
    if (!data.search) {
      // Empêchez la soumission du formulaire
      toast.error("Veuillez entrer un terme de recherche");
      return;
    }

    // Filtrez les livres et mettez à jour l'état
    const filteredBooks = filterBooks(data.search);
    setLivres(filteredBooks);
  };
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Recherche</h1>
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
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Rechercher
        </button>
      </div>

      <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">
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
