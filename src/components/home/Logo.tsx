import { logo } from "@/helpers/helpers";
import React from "react";

function Logo() {
  return (
    <>
      <img
        src={logo}
        alt="logo_image"
        className="w-60  h-70 "
        style={{
          borderRight: "1px solid ",
          borderImage:
            "linear-gradient(to bottom, rgba(186,172,221,1) 0%, rgba(135,229,211,1) 50%, rgba(255,255,255,0) 100%) 1",
        }}
      />
      <div className="w-full flex justify-center">
        <h2 className="font-extrabold text-[23px] md:text-[20px] lg:text-30 text-titles text-center font-roboto">
          Oinc: Gestor de ahorros
        </h2>
      </div>
    </>
  );
}

export default Logo;
