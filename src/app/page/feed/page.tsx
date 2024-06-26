"use client";
import React, { useEffect } from "react";
import Caroucel from "@/components/home/Caroucel";
import Logo from "@/components/home/Logo";
import Options from "@/components/home/Options";
import Stadistic from "@/components/home/Stadistic";
import Objetive from "@/components/ui/Objetive";
import { Objetive as ObjetiveInterface } from "@/interface/objetive";
import { Form } from "@/components/ui";
import { EditForm } from "@/components/ui";
import { useAppContext } from "@/Context";

function Feed() {
  const {
    formState,
    editState,
    objetives,
    setFormState,
    stadistic,
    profile,
    stateObjetive,
    stateMoney,
    stateMoneyComplete,
    stateObjetiveComplete,
    caroucel
  } = useAppContext();

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="p-4">
      <div className=" grid grid-cols-2 ">
        <div className="grid">
          <div className="w-full h-70 p-2 rounded-16 flex items-center bg-back">
            <Logo />
          </div>
          <div className="w-full flex items-end">
            <Options setFormState={setFormState} />
            <Caroucel />
          </div>
        </div>
        <div className="w-full grid grid-cols-2">
          <div className="flex justify-end ">
            <Stadistic
              title="Dinero total"
              progress={stateMoneyComplete}
              total={stateMoney}
            />
          </div>
          <div className="flex justify-end ">
            <Stadistic
              title="Todos los objetivos"
              progress={stateObjetiveComplete}
              total={stateObjetive}
            />
          </div>
        </div>
      </div>
      <section className="bg-back w-full h-fullv mt-21 p-3 rounded-16 ">
        <h2 className="font-roboto font-extrabold text-center text-titles text-30">
          Objetivos
        </h2>
        <div className="w-full h-full mt-10 p-3 rounded-16 grid grid-cols-2">
          {objetives.length >= 1 ? (
            <>
              {objetives.map((obje: ObjetiveInterface) => {
                return (
                  <div key={obje.id}>
                    <Objetive
                      id={obje.id}
                      title={obje.title}
                      amount={obje.amount}
                      progress={obje.progress}
                      image={obje.image}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-ful flex items-cemter justify-center col-span-3">
              <h2 className="text-titles font-roboto font-extrabold ">
                No hay objetivos
              </h2>
            </div>
          )}
        </div>
      </section>
      {formState && <Form />}
      {editState && <EditForm />}
    </div>
  );
}

export default Feed;
