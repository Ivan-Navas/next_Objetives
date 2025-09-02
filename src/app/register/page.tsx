"use client";
import { Input, Button } from "@/components/ui";
import { logo } from "@/helpers/helpers";
import { BiLowVision, BiEnvelope, BiSend } from "react-icons/bi";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { Title } from "@/components/ui/Title";
import { useAppContext } from "@/Context";
import Image from "next/image";

function Register() {
  //TODO(Ramiro) add register function
  const {
    registerPassword,
    setRegisterPassword,
    registerConfirmPassword,
    setRegisterConfirmPassword,
    registerUser,
    registerMessage,
    handleRegisterChange,
    registerLoading,
    handleCode,
  } = useAppContext();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-448 h-600 rounded-16 bg-back px-51 relative">
        <Link href="/login" className="absolute top-2 left-2">
          <BiArrowBack className="text-titles text-20" />
        </Link>
        <h2 className=" text-titles text-40 text-center font-bold font-roboto mt-middle">
          Registro
        </h2>
        <div className="flex justify-center">
          <img src={logo} alt="logo_image" className="w-80 h-80 text-center" />
        </div>
        <Title />
          <h2 className="text-titles text-center">{registerMessage}</h2>
        <Input 
          type="text" 
          name="name"
          placeholder="Nombre" 
          id="name"  
          required 
          onChange={handleRegisterChange}
        />
        <div className="mt-[48px] flex">
          <div className="w-[50%] flex">
            <Input 
              type="email" 
              name="email"
              placeholder="Correo" 
              required 
              id="email" 
              onChange={handleRegisterChange}
            />
            <button
              type="button"
              className="w-[26px] h-[26px] rounded-[4px] bg-[#BADE00] flex items-center justify-center"
            >
              <BiEnvelope
                className="w-[26] h-[26px] text-[#1F1F1F]"
              />
            </button>
          </div>
          <div className="w-[50%] flex">
            <Input 
              type="number" 
              name="code"
              placeholder="Codigo" 
              required 
              id="code" 
              onChange={handleCode}
            />
            <button
              type="button"
              className="w-[26px] h-[26px] rounded-[4px] bg-[#BADE00] flex items-center justify-center"
            >
              <BiSend 
                className="w-[26] h-[26px] text-[#1F1F1F]"
              />
            </button>
          </div>
        </div>
        <div className="flex relative mt-[48px]">
          <Input
            placeholder="Contraseña"
            name="password"
            id="password"
            type={registerPassword === true ? "password" : "text"}
            required
            onChange={handleRegisterChange}
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

        <div className="flex relative mt-[48px]">
          <Input
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            id="confirmPassword"
            type={registerConfirmPassword === true ? "password" : "text"}
            required
            onChange={handleRegisterChange}
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
          className="w-full h-[32px] bg-[#C7F52D] flex justify-center rounded-16 mt-[33px] text-20 text-[#2f2f2f] font-extrabold"
          onClick={(e: any) => {
            e.preventDefault();
            registerUser();
          }}
        > 
          {registerLoading ?
            <Image 
              width={30}
              height={30} 
              src={"https://res.cloudinary.com/ivannavas/image/upload/v1755621258/Oinc/iconos/tube-spinner_cxc0cq.svg"} 
              alt="loginLoading" 
            />: 
            <>Registrar</>
          }
        </Button>
      </form>
    </div>
  );
}

export default Register;
