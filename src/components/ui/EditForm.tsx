import { useAppContext } from "@/Context";
import { Input } from "./Input";
import { RxCross1 } from "react-icons/rx";
import { BiImageAdd } from "react-icons/bi";
import React from "react";

export function EditForm() {
  const { editObjetive, setEditState, toEditObjetive, handleEditObjetiveChange } =
    useAppContext();
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-semi">
      <form className="w-700 h-200 rounded-16 bg-back grid px-86 items-center justify-center relative">
        <button
          className="text-20 text-titles absolute top-2 right-4"
          onClick={(e: any) => {
            e.preventDefault();
            setEditState(false);
          }}
        >
          <RxCross1 />
        </button>
        <h2 className="font-roboto font-extrabold text-titles text-30 text-center">
          Editar objetivo
        </h2>
        <div className="flex">
          <Input
            id="title"
            name="title"
            defaultValue={editObjetive.title}
            placeholder="Objetivo"
            autoFocus
            required
            onChange={handleEditObjetiveChange}
          />
          <Input
            id="amount"
            name="amount"
            defaultValue={editObjetive.amount}
            placeholder="Cantidad"
            required
            onChange={handleEditObjetiveChange}
          />
          <Input
            id="progress"
            name="progress"
            defaultValue={editObjetive.progress}
            placeholder="Progreso"
            required
            onChange={handleEditObjetiveChange}
          />
          <div className="bg-transparent relative cursor-pointer">
            <input
              type="file"
              name="image"
              id="image"
              className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer"
            />
            <BiImageAdd className="w-40 h-40 text-titles  cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="w-125 h-30 rounded-16 bg-titles flex items-center justify-center "
            onClick={(e: any) => {
              e.preventDefault();
              toEditObjetive(editObjetive.id);
            }}
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
}
