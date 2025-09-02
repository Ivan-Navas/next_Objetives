export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface RegisterMessage {
  status: string,
  message: string,
}

export interface TokenInterface {
  id: number,
  name: string,
  email: string,
}
