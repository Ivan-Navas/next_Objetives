import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/libs/prisma";
const { verify } = require("jsonwebtoken");

const getPorcent = (progress: number, amount: number) => {
  let num: number = (progress / amount) * 100;
  const porcent = Math.round(num * 100) / 100;
  return porcent;
};

export const GET = async (request: any) => {
  const token = cookies().get("token");
  const user = await verify(token?.value, process.env.SECRET_VALUE);

  const objetives = await prisma.objetive.findMany({
    where: {
      userId: user.id,
    },
  });
  if (objetives.length > 0) {
    let complete;
    let more = {
      title: "",
      progress: 0,
      amount: 0,
    };
    let minus = {
      title: "",
      progress: 1,
      amount: 1,
    };

    for (let index = 0; index < objetives.length; index++) {
      const element = objetives[index];

      if (index < objetives.length - 1) {
        if (getPorcent(element.progress, element.amount) == 100) {
          complete = element;
        }

        if (getPorcent(element.progress, element.amount) < 100) {
          if (
            getPorcent(more.progress, more.amount) <
            getPorcent(element.progress, element.amount)
          ) {
            more = element;
          }
          if (
            getPorcent(minus.progress, minus.amount) >=
            getPorcent(element.progress, element.amount)
          ) {
            minus = element;
          }
        }
      }

      if (index == objetives.length - 1) {
        if (
          getPorcent(element.progress, element.amount) == 100 &&
          getPorcent(element.progress, element.amount) >=
            getPorcent(
              objetives[index - 1].progress,
              objetives[index - 1].amount
            )
        ) {
          complete = element;
        }
        if (
          getPorcent(element.progress, element.amount) < 100 &&
          getPorcent(element.progress, element.amount) <=
            getPorcent(minus.progress, minus.amount)
        ) {
          minus = element;
        }
        if (getPorcent(element.progress, element.amount) < 100) {
          if (
            getPorcent(more.progress, more.amount) <
            getPorcent(element.progress, element.amount)
          ) {
            more = element;
          }
        }
      }
    }
    const last = objetives[objetives.length - 1];

    return NextResponse.json({
      status: "success",
      message: "caroucel obtenido",
      caroucel: [
        {
          title: "Objetivo reciente",
          page: 1,
          objetive: last,
        },
        {
          title: "Objetivo completo",
          page: 2,
          objetive: complete,
        },
        {
          title: "Mas lejos de 100%",
          page: 3,
          objetive: minus,
        },
        {
          title: "Mas cercano a 100%",
          page: 4,
          objetive: more,
        },
      ],
    });
  } else {
    return NextResponse.json({
      status: "error",
      massage: "No hay objetivos",
    });
  }
};
