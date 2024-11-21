export interface Objetive {
  id?: number;
  title: string;
  amount: number;
  progress: number;
  user?: object;
  userId?: number;
  image?: any;
}

export interface RequestObjetive {
  status: string;
  message: string;
  objetive: Objetive;
}
