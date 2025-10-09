import { useAppContext } from "@/Context";
import React, { useEffect, useState } from "react";
interface Props {
  title: string;
  total: number;
  progress: number;
}

function Stadistic(props: Props) {
  const { addPoint, getPorcent, objetives } = useAppContext();
  const [porcent, setPorcent] = useState<number>(0);

  useEffect(() => {
    if (props.progress <= 0) {
      setPorcent(0);
    } else {
      setPorcent((props.progress / props.total) * 100);
    }
  }, []);

  return (
    <div className="w-full bg-back rounded-16 p-5">
      <h2 className="font-bold text-[15px] sm:text-[20px] md:text-[12px] lg:text-[20px] text-center text-titles font-roboto">
        {props.title}
      </h2>
      <div className="w-full relative flex items-center justify-center">
        <div className="py-[10px]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="linearS">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="10%" stopColor="#87E5D3" />
                <stop offset="50%" stopColor="#BAACDD" />
              </linearGradient>
            </defs>
            <circle
              r="55"
              cx="60"
              cy="60"
              pathLength="100"
              className="fill-none stroke-gray-700 stroke-[10] flex items-center justify-center"
            />
            <circle
              r="55"
              cx="60"
              cy="60"
              pathLength="100"
              className="fill-none stroke-[10] flex items-center justify-center"
              strokeLinecap="round"
              style={{
                strokeDasharray:
                  props.total > 0
                    ? `${getPorcent(props.progress, props.total)},100`
                    : "0,100",
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                stroke: "url(#linearS)",
                transition: "stroke-dasharray 0.5s ease-out",
              }}
            />
          </svg>
        </div>
        <p className="font-extrabold text-26 absolute text-center font-roboto ">
          {objetives.length >= 1 ? (
            <>{getPorcent(props.progress, props.total)}%</>
          ) : (
            <>0%</>
          )}
        </p>
      </div>
      <div className="w-full grid grid-cols-2  bg-font rounded-16 p-2">
        <div
          className="grid justify-center"
          style={{
            borderRight: "1px solid ",
            borderImage:
              "linear-gradient(to bottom, rgba(186,172,221,1) 0%, rgba(135,229,211,1) 50%, rgba(255,255,255,0) 100%) 1",
          }}
        >
          <h3 className="font-bold text-12 text-white text-center font-roboto">
            Completado
          </h3>
          <p className="font-bold text-12 text-titles text-center font-roboto">
            {addPoint(props.progress)}
          </p>
        </div>
        <div className="grid justify-center">
          <h3 className="font-bold text-12 text-white text-center font-roboto">
            Total
          </h3>
          <p className="font-bold text-12 text-titles text-center font-roboto">
            {addPoint(props.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stadistic;
