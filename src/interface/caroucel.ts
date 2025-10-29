export interface CaroucelObjetive {
  id: number,
  title: string,
  amount: number,
  progress: number,
  image: string,
  userId: number,
}
export interface CaroucelCard {
  title: string,
  objetive: CaroucelObjetive,
  page: number,
}
export interface CaroucelRequest {
  status: string,
  message: string,
  objetives?: CaroucelCard[],
}


