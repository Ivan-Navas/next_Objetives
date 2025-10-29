import { useAppContext } from "@/Context";
import React from "react";
interface Props {
  amount: number,
  progress: number,
}

function CircleCaroucel({amount, progress}: Props) {
  const { getPorcent } = useAppContext();
  return (

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
            amount > 0
              ? `${getPorcent(progress, amount)},100`
              : "0,100",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          stroke: "url(#linearS)",
          transition: "stroke-dasharray 0.5s ease-out",
        }}
      />
    </svg>
  )
}

export default CircleCaroucel;