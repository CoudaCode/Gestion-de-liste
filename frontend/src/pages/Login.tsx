import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthProvider";
import { LoginFormInputs } from "../types/user";
const Login: React.FC = () => {
  const styleInpt =
    "w-full rounded-lg border-green-200 p-4 pe-12 text-sm shadow-sm  bg-gray-200";

  const buttonStyle =
    "inline-block rounded-lg bg-green-500 hover:bg-green-600 px-5 py-3 text-sm font-medium text-white";
  const router = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { Login } = useAuth();
  const onSubmit = async (data: LoginFormInputs) => {
    if (data.password === "" || data.email === "") {
      toast.error("Veillez remplir les champs vides svp");
      return;
    }
    console.log(data);
    try {
      await Login(data);
      router("/search");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Connectez-vous à votre compte
            </h1>
            <p className="mt-4 text-gray-100">
              Entrez vos informations de connexion pour accéder à votre compte.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            className="max-w-md mx-auto mt-8 mb-0 space-y-4"
          >
            <Input
              register={register}
              className={styleInpt}
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
            />
            <Input
              register={register}
              className={styleInpt}
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter mot de passe"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-500 hover:text-green-600">
                Pas encore de compte ?
                <Link to="/signup" className="underline">
                  S'inscrire
                </Link>
              </p>
              <Button
                type="submit"
                className={buttonStyle}
                text="Se connecter"
              />
            </div>
          </form>
        </div>

        <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </section>
    </>
  );
};

export default Login;
