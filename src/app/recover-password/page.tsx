"use client"
import Link from "next/link";
import { Title } from "@/components/ui";
import { logo } from "@/helpers/helpers";
import { BiArrowBack, BiLowVision, BiEnvelope } from "react-icons/bi";
import { Input, Button } from "@/components/ui";
import Image from "next/image"
import { useAppContext } from "@/Context";
import { sendPasswordRecover } from "../emails/recover-password";
import { useState } from "react";

function RecoverPassword() {
  const { recoverLoading, recoverMessage } = useAppContext();
  const [ email, setEmail ] = useState<string>("")

  return(
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-[350px] h-600 relative rounded-16 bg-[#2f2f2f] px-1 sm:w-[448px] sm:bg-back sm:px-51">
        <Link href="/login" className="absolute top-2 left-2">
          <BiArrowBack className="text-titles text-20" />
        </Link>
        <h2 className=" text-titles text-[30px] text-center font-bold font-roboto">
          Recuperar contraseña
        </h2>
        <div className="flex justify-center">
          <img src={logo} alt="logo_image" className="w-80 h-80 text-center" />
        </div>
        <Title />
          <h2 className={ recoverMessage.status === "error"? "text-[#E62727] text-center": "text-titles text-center"}>{recoverMessage.message}</h2>
        <h2 className="text-white text-[12px] font-bold font-roboto mt-[16px] mb-[45px]">
          Te enviaremos un código a tu correo, para restablecer tu contraseña, no lo olvides, nunca compartas el código.
        </h2>
        <Input 
          type="text" 
          name="name"
          placeholder="Correo" 
          id="email"  
          required 
          onChange={(e)=>(
            setEmail(e.target.value)
          )}
        />
        <Button
          className="w-full h-[32px] bg-[#C7F52D] flex justify-center rounded-16 mt-[73px] text-20 text-[#2f2f2f] font-extrabold"
          onClick={(e)=>{
            e.preventDefault();
            sendPasswordRecover(email);
          }}
        > 
          {recoverLoading ?
            <Image 
              width={30}
              height={30} 
              src={"https://res.cloudinary.com/ivannavas/image/upload/v1755621258/Oinc/iconos/tube-spinner_cxc0cq.svg"} 
              alt="loginLoading" 
            />: 
            <>Enviar</>
          }
        </Button>
      </form>
    </div>
  )
}

export default RecoverPassword;
