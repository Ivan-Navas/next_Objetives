"use client";
import { Input, Button } from "@/components/ui";
import { logo } from "@/helpers/helpers";
import { useState } from "react";
import { BiLowVision } from "react-icons/bi";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { Title } from "@/components/ui/Title";
import { useAppContext } from "@/Context";

function Register() {
  //TODO(Ramiro) add register function
  const {
    registerPassword,
    setRegisterPassword,
    registerConfirmPassword,
    setRegisterConfirmPassword,
    registerUser,
    registerMessage,
  } = useAppContext();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-448 h-600 rounded-16 bg-back px-51 relative">
        <Link href="/page/login" className="absolute top-2 left-2">
          <BiArrowBack className="text-titles text-20" />
        </Link>
        <h2 className=" text-titles text-40 text-center font-bold font-roboto mt-middle">
          Registro
        </h2>
        <div className="flex justify-center">
          <img src={logo} alt="logo_image" className="w-80 h-80 text-center" />
        </div>
        <Title />
        {registerMessage === "success" && (
          <h2 className="text-titles text-center">Iniciando Sesion...</h2>
        )}
        <Input type="text" placeholder="Nombre" id="name" required />
        <div className="mt-12">
          <Input type="email" placeholder="Correo" required id="email" />
        </div>
        <div className="flex relative mt-12 mb-2">
          <Input
            placeholder="Contraseña"
            id="password"
            type={registerPassword === true ? "password" : "text"}
            required
          />
          <button
            className="absolute top-0 right-0 "
            onClick={(e) => {
              e.preventDefault();
              setRegisterPassword(!registerPassword);
            }}
          >
            <BiLowVision className="text-titles text-20" />
          </button>
        </div>

        <div className="flex relative mt-12 mb-2">
          <Input
            placeholder="Confirmar contraseña"
            id="confirmPassword"
            type={registerConfirmPassword === true ? "password" : "text"}
            required
          />
          <button
            className="absolute top-0 right-0 "
            onClick={(e) => {
              e.preventDefault();
              setRegisterConfirmPassword(!registerConfirmPassword);
            }}
          >
            <BiLowVision className="text-titles text-20" />
          </button>
        </div>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            registerUser();
          }}
        >
          {" "}
          Registrar{" "}
        </Button>
        {registerMessage.length > 0 && registerMessage !== "success" && (
          <h2 className="text-red-600 font-semibold">*{registerMessage}</h2>
        )}
      </form>
    </div>
  );
}

export default Register;
