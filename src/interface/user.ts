export default interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface RegisterRequest {
  status: string,
  message: string,
  user: User,
}

export interface RegisterMessage {
  status: string,
  message: string,
}

export interface CreateCodeRequest {
  status: string,
  message: string,
}

export interface CodeRequest {
  status: string,
  message: string,
}

export interface TokenInterface {
  id: number,
  name: string,
  email: string,
}
