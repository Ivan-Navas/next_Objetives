import React, { useState, useEffect } from "react";
import CaroucelCard from "../ui/CaroucelCard";
import { useAppContext } from "@/Context";
import LoadingCaroucel from "../ui/LoadingCaroucel";
function Caroucel() {
  const { caroucelState, setCaroucelOb, caroucelOb, loading } = useAppContext();
  const [pageState, setPageState] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPageState(prev => {
        const lastIndex = caroucelState.objetives!.length - 1;
        const next = prev >= lastIndex ? 0 : prev + 1;
        setCaroucelOb(caroucelState.objetives![next]);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [caroucelState.objetives]);
  return (
    <>
      {loading ?
        <LoadingCaroucel />:
        <CaroucelCard objetive={caroucelOb.objetive!} />
      }
    </>
  );
}

export default Caroucel;
