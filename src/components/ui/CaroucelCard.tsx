"use client";
import React from "react";
//import { logo as image } from "@/helpers/helpers";
//import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useAppContext } from "@/Context";
import { CaroucelObjetive } from "@/interface/caroucel";
//import Image from "next/image";

type Props = {
  objetive: CaroucelObjetive;
};

const CaroucelCard = (props: Props) => {
  const { caroucelState, addPoint, getPorcent, page, setPage, caroucelOb } =
    useAppContext();

  return (
    <div className="w-full h-166 bg-back ml-16 rounded-16 relative">
      {caroucelState.objetives![0] ? (
        <>
          {caroucelOb.objetive ? (
            <>
              <h2 className="text-center text-30 text-titles font-extrabold font-roboto ">
                {caroucelOb.title}
              </h2>
              <div className=" flex pl-10">
                <div>
                  <h2 className="text-center text-titles text-16 font-extrabold font-roboto margin-0">
                    {getPorcent(
                      props.objetive.progress,
                      props.objetive.amount
                    )}
                    %
                  </h2>
                  <div className="grid relative items-center margin-0">
                    <svg width="70" height="70" viewBox="0 0 70 70 ">
                      <defs>
                        <linearGradient id="linearS">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                          <stop offset="10%" stopColor="#87E5D3" />
                          <stop offset="50%" stopColor="#BAACDD" />
                        </linearGradient>
                      </defs>
                      <circle
                        r="30"
                        cx="35"
                        cy="35"
                        pathLength="100"
                        className="fill-none stroke-gray-700 stroke-[10] flex items-center justify-center"
                      />
                      <circle
                        r="30"
                        cx="35"
                        cy="35"
                        pathLength="100"
                        className="fill-none stroke-[10] flex items-center justify-center"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray:
                            props.objetive.amount > 0
                              ? `${getPorcent(props.objetive.progress, props.objetive.amount)},100`
                              : "0,100",
                          transform: "rotate(-90deg)",
                          transformOrigin: "50% 50%",
                          stroke: "url(#linearS)",
                          transition: "stroke-dasharray 0.5s ease-out",
                        }}
                      />
                    </svg>
                    <img
                      src={props.objetive.image}
                      alt="objetive_icon"
                      className="w-50 h-50 ml-10 absolute rounded-100%"
                    />
                  </div>
                </div>
                <section className="grid items-center ml-10">
                  <div>
                    <h2 className="text-white text-30 font-extrabold font-roboto">
                      {props.objetive.title}
                    </h2>
                    <p className="text-titles text-16 font-extrabold font-roboto">
                      {addPoint(props.objetive.progress)} /{" "}
                      {addPoint(props.objetive.amount)}
                    </p>
                  </div>
                </section>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <h2 className="text-titles text-center text-20 font-extrabold ">
                Ningun objetivo cumple esta condicion
              </h2>
            </div>
          )}

        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-titles text-20 font-extrabold">
            {" "}
            No hay objetivos
          </h2>
        </div>
      )}
    </div>
  );
};

export default CaroucelCard;
