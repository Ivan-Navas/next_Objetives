import { Objetive as ObjetiveInterface } from '@/interface/objetive';
import { Auth as AuthInterface} from '@/interface/auth';
import { Stadistic as StadisticInterface } from '@/interface/stadistic';
import { Credential } from '@/interface/login';

export type ContextType = {
  objetives: ObjetiveInterface[];
  setObjetives: (objetives: ObjetiveInterface[]) => void;
  formState: boolean;
  setFormState: (formState: boolean) => void;
  newObjetive: ObjetiveInterface;
  setNewObjetive: (newObjetive: ObjetiveInterface) => void;
  auth: AuthInterface;
  setAuth: (auth: AuthInterface) => void;
  stadistic: StadisticInterface;
  setStadistic: (stadistic: StadisticInterface) => void;
  handleObjetive: (e: any)=> void;
  profile: ()=>void;
  createObjetive: ()=> void;
  handleSubmit: (e: any)=> void;
  handleChange: (e: any)=> void;
  loginPassword: boolean;
  setLoginPassword: (loginPassword: boolean)=> void;
  credentials: Credential;
  setCredentials: (credential: Credential)=> void;
  getProfile: (e: any)=> void;
  registerPassword: boolean;
  setRegisterPassword: (registerPassword : boolean)=> void;
  registerConfirmPassword: boolean;
  setRegisterConfirmPassword: (registerConfirmPassword : boolean)=> void;
}