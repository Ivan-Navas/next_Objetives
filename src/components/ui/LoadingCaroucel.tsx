import React from "react";
import { useAppContext } from "@/Context";
import { CaroucelObjetive } from "@/interface/caroucel";
import CircleCaroucel from "./CircleCaroucel";

const LoadingCaroucel = () => {
  return (
    <div className="w-full h-166 bg-back ml-[5px] rounded-16 relative">
      <div className="w-full h-[30px] flex justify-center mt-[4px]">
        <div className="w-[234px] h-[30px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
      </div>
      <div className=" flex pl-10">
        <div>
          <div className="w-full h-[15px] flex justify-center">
            <div className="w-[36px] h-[15px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
          </div>
          <div className="margin-0">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle
                r="30"
                cx="35"
                cy="35"
                pathLength="100"
                className="fill-none stroke-[#3F3F3F] stroke-[10]"
              />
            </svg>
          </div>
        </div>
        <section className="grid items-center ml-10">
          <div>
            <div className="w-full h-[30px] flex justify-center mt-[4px]">
              <div className="w-[141px] h-[30px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
            </div>
            <div className="w-full h-[30px] flex justify-center mt-[4px]">
              <div className="w-[141px] h-[15px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoadingCaroucel;
