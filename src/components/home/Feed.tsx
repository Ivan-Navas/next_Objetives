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
import LoadingStadistic from "../ui/LoadingStadistic";
import LoadingObjetive from "../ui/LoadingObjetive";

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
    caroucelState,
    caroucel,
    loading,
  } = useAppContext();

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="mt-[5px] sm:p-4">
      <div className="grid sm:grid-cols-2">
        <div className="grid px-[5px]">
          <div className="w-full h-70 rounded-16 flex items-center bg-back">
            <Logo />
          </div>
          <div className="flex mt-[5px]">
            <Options setFormState={setFormState} />
            <Caroucel />
          </div>
        </div>
        <div className="w-full mt-[5px] sm:mt-0 gap-[5px] px-[5px] grid grid-cols-2">
          <div className="flex justify-end ">
            {loading ?
              <LoadingStadistic
                title="Dinero total"
              /> :
              <Stadistic
                title="Dinero total"
                progress={stateMoneyComplete}
                total={stateMoney}
              />
            }
          </div>
          <div className="flex justify-end ">
            {loading ?
              <LoadingStadistic
                title="Todos los objetivos"
              /> :
              <Stadistic
                title="Todos los objetivos"
                progress={stateObjetiveComplete}
                total={stateObjetive}
              />
            }

          </div>
        </div>
      </div>
      <div className="px-[5px]">
        <section className="bg-back w-full h-full mt-[5px] sm:mt-21 rounded-16 ">
          <h2 className="font-roboto font-extrabold text-center text-titles text-30">
            Objetivos
          </h2>
          <div className="w-full h-full mt-10 p-3 rounded-16 grid sm:grid-cols-2">
            {loading ?
              <>
                <LoadingObjetive />
                <LoadingObjetive />
                <LoadingObjetive />
                <LoadingObjetive />
              </> :
              <>
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
              </>
            }
          </div>
        </section>
      </div>
      {formState && <Form />}
      {editState && <EditForm />}
    </div>
  );
}

export default Feed;
