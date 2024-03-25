import React from "react";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-28 px-4 md:px-8 w-full h-full">
      <div className="w-full h-full absolute"></div>
      <div className="max-w-xl mx-auto text-center relative">
        <div className="py-4">
          <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
            Découvrez Notre Vaste Collection de Livres
          </h3>
          <p className="text-gray-300 leading-relaxed mt-3">
            Plongez dans un monde de connaissances avec notre bibliothèque
            étendue de livres. Que vous aimiez la fiction, la non-fiction ou le
            matériel éducatif, nous avons ce qu'il vous faut. Trouvez votre
            prochaine lecture préférée et élargissez vos horizons dès
            aujourd'hui.
          </p>
        </div>
        <div className="mt-5 items-center justify-center gap-3 sm:flex">
          <Button
            text="Explorer Maintenant"
            type="button"
            link="/signup"
            className="block w-full mt-2 py-2.5 px-8 text-gray-700 bg-white rounded-md duration-150 hover:bg-gray-100 sm:w-auto"
          />
          <Button
            text="Se connecter"
            type="button"
            link="/login"
            className="block w-full mt-2 py-2.5 px-8 text-gray-300 bg-gray-700 rounded-md duration-150 hover:bg-gray-800 sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
};
export default Home;
