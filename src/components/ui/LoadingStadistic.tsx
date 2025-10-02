import React from "react";

interface Props {
  title: string,
}

function LoadingStadistic({ title }: Props) {
  return (
    <div className="w-10/12 bg-back rounded-16 p-5">
      <h2 className="font-bold text-20 text-center text-titles font-roboto">
        {title}
      </h2>
      <div className="w-full relative flex items-center justify-center">
        <div className="py-[10px]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              r="55"
              cx="60"
              cy="60"
              pathLength="100"
              className="fill-none stroke-gray-700 stroke-[10] flex items-center justify-center"
            />
          </svg>
        </div>
        <p className="font-extrabold text-26 absolute text-center font-roboto ">
        </p>
      </div>
      <div className="w-full grid grid-cols-2  bg-font rounded-16 p-2">
        <div
          className="grid justify-center"
        >
          <div className="w-full h-[19px] flex justify-center">
            <div className="w-[57px] h-[10px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
          </div>
          <div className="w-full h-[19px] flex justify-center">
            <div className="w-[57px] h-[10px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
          </div>
        </div>
        <div className="grid justify-center">
          <div className="w-full h-[19px] flex justify-center">
            <div className="w-[57px] h-[10px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
          </div>
          <div className="w-full h-[19px] flex justify-center">
            <div className="w-[57px] h-[10px] bg-[#6F6F6F] rounded-[4px] shadow animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingStadistic;
