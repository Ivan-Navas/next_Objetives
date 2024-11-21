import React from "react";
import { Input } from "./index";
import { RxCross1 } from "react-icons/rx";
import { BiImageAdd } from "react-icons/bi";
import { useAppContext } from "@/Context";

export function Form() {
  const { handleObjetive, createObjetive, setFormState, file, setFile } =
    useAppContext();

  const useEnter = (e: any) => {
    if (e.key === "Enter") {
      createObjetive();
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-semi">
      <form className="w-600 h-200 rounded-16 bg-back grid px-86 items-center justify-center relative">
        <button
          className="text-20 text-titles absolute top-2 right-4"
          onClick={(e: any) => {
            e.preventDefault();
            setFormState(false);
            setFile(null);
          }}
        >
          {" "}
          <RxCross1 />{" "}
        </button>
        <h2 className="font-roboto font-extrabold text-titles text-30 text-center">
          Nuevo objetivo
        </h2>
        <div className="flex">
          <Input
            placeholder="Objetivo"
            type="text"
            name="title"
            required
            autoFocus
            onChange={handleObjetive}
            onKeyDown={useEnter}
          />
          <Input
            placeholder="Cantidad"
            type="number"
            name="amount"
            required
            onChange={handleObjetive}
            onKeyDown={useEnter}
          />
          <div className="bg-transparent relative cursor-pointer">
            <input
              type="file"
              title="file"
              id="image"
              className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target && e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <BiImageAdd className="w-40 h-40 text-titles  cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-125 h-30 rounded-16 bg-titles flex items-center justify-center "
            onClick={(e: any) => {
              e.preventDefault();
              createObjetive();
            }}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
