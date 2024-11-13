import React, { useState, useEffect } from "react";
import CaroucelCard from "../ui/CaroucelCard";
import { useAppContext } from "@/Context";
function Caroucel() {
  const { caroucel, caroucelState, setCaroucelOb, page, setPage, caroucelOb } =
    useAppContext();

  useEffect(() => {
    setCaroucelOb(caroucelState.caroucel[page]);
    setTimeout(() => {
      if (page < caroucelState.caroucel.length - 1) {
        setPage(page + 1);
      }
      if (page == caroucelState.caroucel.length - 1) {
        setPage(0);
      }
    }, 5000);
  });
  return (
    <>
      <CaroucelCard objetive={caroucelOb} />
    </>
  );
}

export default Caroucel;
