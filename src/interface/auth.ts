export interface Auth {
  id?: number;
  email: string;
  name: string;
}

export interface UserToRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
