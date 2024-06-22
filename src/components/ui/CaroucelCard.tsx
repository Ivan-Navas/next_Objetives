import React, { useEffect } from "react";
import { logo as image } from "@/helpers/helpers";
import { Objetive } from "../../interface/objetive";
import {
  BiChevronRight,
  BiChevronLeft,
  BiCircle,
  BiSolidCircle,
} from "react-icons/bi";
import Circle from "../ui/Circle";
import { useAppContext } from "@/Context";
import { CaroucelOb } from "@/interface/caroucel";

type Props = {
  objetive: CaroucelOb;
};

const CaroucelCard = (props: Props) => {
  const { caroucelState, caroucel, addPoint, getPorcent, page, setPage, caroucelOb } =
    useAppContext();

  return (
    <div className="w-full h-166 bg-back ml-16 rounded-16">
      {caroucelState.caroucel.length > 0 ? (
        <>
          <h2 className="text-center text-30 text-titles font-extrabold font-roboto ">
            {caroucelOb.title}
          </h2>
          <div className=" flex pl-10">
            <div>
              <h2 className="text-center text-titles text-16 font-extrabold font-roboto margin-0">
                {getPorcent(
                  props.objetive.objetive.progress,
                  props.objetive.objetive.amount
                )}
                %
              </h2>
              <div className="grid relative items-center margin-0">
                <svg className="w-70 h-70  ">
                  <defs>
                    <linearGradient id="linear">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                      <stop offset="10%" stopColor="#87E5D3" />
                      <stop offset="70%" stopColor="#BAACDD" />
                    </linearGradient>
                  </defs>
                  <circle
                    r={30}
                    cx={"50%"}
                    cy={"50%"}
                    pathLength={100}
                    className="fill-none  stroke-10 flex items-center  justify-center absolute top-0 r-0"
                    style={{
                      strokeDasharray:
                        getPorcent(
                          props.objetive.objetive.progress,
                          props.objetive.objetive.amount
                        ) + ",100",
                      transform: "rotate(-90deg)",
                      transformOrigin: "50%",
                      stroke: "url(#linear)",
                    }}
                  />
                </svg>
                <img
                  src={image}
                  alt="objetive_icon"
                  className="w-50 h-50 ml-10 absolute rounded-100%"
                />
              </div>
            </div>
            <section className="grid items-center ml-10">
              <div>
                <h2 className="text-white text-30 font-extrabold font-roboto">
                  {props.objetive.objetive.title}
                </h2>
                <p className="text-titles text-16 font-extrabold font-roboto">
                  {addPoint(props.objetive.objetive.progress)} /{" "}
                  {addPoint(props.objetive.objetive.amount)}
                </p>
              </div>
            </section>
          </div>
          <div className="w-full flex items-center justify-center ">
            {caroucelState.caroucel.length > 1 && (
              <button
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                }}
              >
                <BiChevronLeft className="text-16 text-titles mr-12" />
              </button>
            )}

            {caroucelState.caroucel.map((caroucelObjetive) => {
              return (
                <>
                  {props.objetive.page === caroucelObjetive.page ? (
                    <button key={caroucelObjetive.page}>
                      <img
                        src="https://res.cloudinary.com/ivannavas/image/upload/v1716493205/GestorDeAhorros/Web/Ellipse_40_jx18nu.svg"
                        className="text-titles text-10 mr-12"
                      />
                    </button>
                  ) : (
                    <button key={caroucelObjetive.page}>
                      <img
                        src="https://res.cloudinary.com/ivannavas/image/upload/v1716492993/GestorDeAhorros/Web/Ellipse_42_q8bmao.svg"
                        className="text-titles text-10 mr-12"
                      />
                    </button>
                  )}
                </>
              );
            })}

            {caroucelState.caroucel.length > 1 && (
              <button
                onClick={() => {
                  if (page < caroucelState.caroucel.length - 1) {
                    setPage(page + 1);
                  }
                }}
              >
                <BiChevronRight className="text-16 text-titles" />
              </button>
            )}
          </div>
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
