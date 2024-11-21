import { Objetive } from "./objetive";

interface Card {
  title: string,
  page: number,
  caroucelObjetive: Objetive,
}
interface CaroucelReq {
  name: string,
  page: number,
  objetive: Objetive,
}

export interface Caroucel {
  card: Card[],
}
export interface CaroucelOb{
  title: string,
  page: number,
  objetive: Objetive,
}

export interface CaroRequest {
  status: string,
  message: string,
  caroucel: CaroucelOb[]
}
export interface Caroucel2{
    title: string,
    page: number,
    objetive: Objetive,
}
