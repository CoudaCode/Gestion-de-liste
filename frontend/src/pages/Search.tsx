import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Input from "../components/Input";
import { useAuth } from "../context/AuthProvider";
const Search: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useNavigate();
  console.log(isAuthenticated);
  // const [livres, setLivres] = useState<LivreType[]>([]);

  // const [search, setSearch] = useState<string>("");

  const { register, handleSubmit } = useForm();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const onSubmit = (data) => {
    // Validez la valeur de recherche
    if (!data.search) {
      toast.error("Veuillez entrer un terme de recherche");
      return;
    }
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
        {/* {Array.isArray(livres) &&
          livres.map((livre: LivreType) => (
            <Livre
              key={livre?._id}
              title={livre?.title}
              auteur={livre?.auteur}
              description={livre?.content.substring(0, 20)}
              id={livre?._id as string}
            />
          ))} */}
      </div>
    </>
  );
};

export default Search;
