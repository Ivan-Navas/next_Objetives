import React, { useState } from "react";
import { useAppContext } from "@/Context";
import { VscChromeClose } from "react-icons/vsc";

type Props = {
  id?: number;
  title: string;
  amount: number;
  progress: number;
  image: string | undefined;
};

function Objetive(props: Props) {
  const { setEditState, addPoint, objetives, setObjetives, setEditObjetive, getPorcent } =
    useAppContext();
  let p: number = 0;
  const [opacity, setOpacity] = useState<number>(0);

  return (
    <div
      className="flex pl-10 relative"
      onMouseOver={() => {
        setOpacity(1);
      }}
      onMouseLeave={() => {
        setOpacity(0);
      }}
    >
      <button
        className="absolute top-0 right-0 opacity-0"
        onClick={async () => {
          const request = await fetch(`/api/objetive/delete/${props.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const newObjetives = objetives.filter(
            (objeti) => objeti.id !== props.id
          );
          setObjetives(newObjetives);
        }}
        style={{ opacity: opacity }}
      >
        <VscChromeClose className="text-titles text-20" />
      </button>
      <section>
        <h2 className="text-center text-titles text-16 font-extrabold font-roboto">
          {getPorcent(props.progress, props.amount)}%
        </h2>
        <div className="flex relative items-center justify-center">
          <svg className="w-110 h-110  ">
            <defs>
              <linearGradient id="linear">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="10%" stopColor="#87E5D3" />
                <stop offset="70%" stopColor="#BAACDD" />
              </linearGradient>
            </defs>
            <circle
              r={50}
              cx={"50%"}
              cy={"50%"}
              pathLength={100}
              className="fill-none  stroke-10 flex items-center  justify-center absolute top-0 r-0"
              style={{
                strokeDasharray: getPorcent(props.progress, props.amount) + ",100",
                transform: "rotate(-90deg)",
                transformOrigin: "50%",
                stroke: "url(#linear)",
              }}
            />
          </svg>
          <img
            src={props.image}
            alt="objetive_icon"
            className="w-90 h-90 absolute flex items-center justify-center  rounded-100%"
          />
        </div>
      </section>
      <section className="grid items-center ml-10 w-full">
        <div className="w-full">
          <h2 className="text-white text-30 font-extrabold font-roboto">
            {props.title}
          </h2>
          <p className="text-titles text-16 font-extrabold font-roboto">
            {addPoint(props.progress)} / {addPoint(props.amount)}
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-titles w-125 rounded-16 "
            style={{ opacity: opacity }}
            onClick={() => {
              setEditState(true);
              setEditObjetive({
                title: props.title,
                amount: props.amount,
                progress: props.progress,
                image: props.image,
                id: props.id,
              });
            }}
          >
            {" "}
            Editar{" "}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Objetive;
