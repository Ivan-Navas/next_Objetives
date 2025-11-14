"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Objetive as ObjetiveInterface,
  RequestObjetive,
} from "@/interface/objetive";
import { ContextType } from "@/types/indexTypes";
import { Stadistic as StadisticInterface } from "@/interface/stadistic";
import { Auth as AuthInterface, UserToRegister } from "@/interface/auth";
import { Credential } from "@/interface/login";
import User, { CodeRequest, CreateCodeRequest, RegisterMessage } from "@/interface/user";
import { Objetives } from "@/interface/objetives";
import { useRouter } from "next/navigation";
import {
  CaroucelRequest,
  CaroucelCard,
} from "@/interface/caroucel";
//import { useSession } from "next-auth/react";

//#region AppContext
const AppContext = createContext<ContextType>({
  loading: true,
  setLoading: () => { },
  objetives: [],
  setObjetives: () => { },
  formState: false,
  setFormState: () => { },
  editState: false,
  setEditState: () => { },
  newObjetive: {
    title: "",
    amount: 0,
    progress: 0,
    image: "",
  },
  setNewObjetive: () => { },
  auth: {
    email: "",
    name: "",
  },
  setAuth: () => { },
  stadistic: {
    objetives: 0,
    objetivesComplete: 0,
    money: 0,
    moneyComplete: 0,
  },
  setStadistic: () => { },
  handleObjetive: () => { },
  profile: () => { },
  createObjetive: () => { },
  handleSubmit: () => { },
  handleChange: () => { },
  handleRegisterChange: () => { },
  handleEditObjetiveChange: () => { },
  loginPassword: true,
  setLoginPassword: () => { },
  credentials: {
    email: "",
    password: "",
  },
  setCredentials: () => { },
  registerPassword: true,
  setRegisterPassword: () => { },
  registerConfirmPassword: true,
  setRegisterConfirmPassword: () => { },
  stateObjetive: 0,
  setStateObjetive: () => { },
  stateMoney: 0,
  addPoint: () => "",
  editObjetive: {
    amount: 0,
    title: "",
    progress: 0,
  },
  setEditObjetive: () => { },
  toEditObjetive: () => { },
  userToRegister: {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  },
  setUserToRegister: () => { },
  registerUser: () => { },
  registerMessage: {
    status: "",
    message: "",
  },
  setRegisterMessage: () => { },
  logOut: () => { },
  getPorcent: () => 0,
  stateMoneyComplete: 0,
  setStateMoneyComplete: () => { },
  stateObjetiveComplete: 0,
  setStateObjetiveComplete: () => { },
  caroucelState: {
    status: "",
    message: "",
    objetives: [],
  },
  setCaroucelState: () => { },
  caroucel: () => { },
  caroucelOb:
  {
    title: "",
    page: 0,
    objetive: {
      id: 0,
      title: "",
      progress: 0,
      amount: 0,
      image: "",
      userId: 0,
    },
  },
  setCaroucelOb: () => { },
  page: 0,
  setPage: () => { },
  file: "",
  setFile: () => { },
  loginMessage: "",
  setLoginMessage: () => { },
  loginLoading: false,
  setLoginLoading: () => { },
  registerLoading: false,
  setRegisterLoading: () => { },
  code: "",
  setCode: () => { },
  handleCode: () => { },
  sendCodeVerification: () => { },
});

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  //#region states/variables
  const apiUrl = process.env.NEXT_PUBLIC_VERCEL_API;
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [objetives, setObjetives] = useState<ObjetiveInterface[]>([]);
  const [editObjetive, setEditObjetive] = useState<ObjetiveInterface>({
    title: "",
    amount: 0,
    progress: 0,
    id: 0,
  });
  const [stateMoney, setStateMoney] = useState<number>(0);
  const [stateObjetive, setStateObjetive] = useState<number>(0);
  const [stateMoneyComplete, setStateMoneyComplete] = useState<number>(0);
  const [stateObjetiveComplete, setStateObjetiveComplete] = useState<number>(0);
  const [formState, setFormState] = useState<boolean>(false);
  const [editState, setEditState] = useState<boolean>(false);
  const [registerPassword, setRegisterPassword] = useState<boolean>(true);
  const [registerMessage, setRegisterMessage] = useState<RegisterMessage>({
    status: "",
    message: "",
  });
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState<boolean>(true);
  const [newObjetive, setNewObjetive] = useState<ObjetiveInterface>({
    title: "",
    amount: 0,
    progress: 0,
    image: "",
  });
  const [stadistic, setStadistic] = useState<StadisticInterface>({
    objetives: 0,
    objetivesComplete: 0,
    money: 0,
    moneyComplete: 0,
  });
  const [auth, setAuth] = useState<AuthInterface>({
    email: "",
    name: "",
  });
  const [loginPassword, setLoginPassword] = useState<boolean>(true);
  const [credentials, setCredentials] = useState<Credential>({
    email: "",
    password: "",
  });
  const [userToRegister, setUserToRegister] = useState<UserToRegister>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [caroucelState, setCaroucelState] = useState<CaroucelRequest>({
    status: "",
    message: "",
    objetives: [],
  });
  const [caroucelOb, setCaroucelOb] = useState<CaroucelCard>({
    title: "",
    page: 0,
    objetive: {
      id: 0,
      title: "",
      amount: 0,
      progress: 0,
      image: "",
      userId: 0,
    }
  });
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<any>(null);
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  //#region functions
  const handleObjetive = (e: any) => {
    setNewObjetive({
      ...newObjetive,
      [e.target.name]: e.target.value,
    });
  };

  const profile = async () => {
    const request = await fetch("/api/user/profile");
    const data = await request.json();
    if (data.status === "success") {
      setAuth(data.user);
      const obRequest = await fetch(`/api/objetive/get/${data.user.id}`, {
        method: "GET",
      });
      const obData: Objetives = await obRequest.json();
      if (obData.status = "success") {
        setObjetives(obData.objetives);
        let myTotalMoney: number = 0;
        let myProgressMoney: number = 0;
        let myCompleteObjetive: number = 0;
        for (let i: number = 0; i < obData.objetives.length; i++) {
          myTotalMoney += obData.objetives[i].amount;
          myProgressMoney += obData.objetives[i].progress;
          setStateMoney(myTotalMoney);
          setStateMoneyComplete(myProgressMoney);
          if (obData.objetives[i].progress >= obData.objetives[i].amount) {
            myCompleteObjetive++;
          }
          setStateObjetiveComplete(myCompleteObjetive);
        }
        const caroucelReq = await fetch(`/api/objetive/caroucel`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
        );
        const caroucelData: CaroucelRequest = await caroucelReq.json();
        if (caroucelData.status === "success") {
          setCaroucelState(caroucelData);
          setCaroucelOb(caroucelData.objetives![0]);
        }
      }
      setStateObjetive(obData.objetives.length);
      return data.user;
    }
    setLoading(false);
  };

  const createObjetive = async () => {
    if (newObjetive.title !== "") {
      try {
        const response = await fetch("/api/objetive/create", {
          method: "POST",
          body: JSON.stringify({
            title: newObjetive.title,
            amount: newObjetive.amount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const formData = new FormData();
        formData.append("file", file);
        const addImageRequest = await fetch(
          `/api/objetive/add-image/${data.objetive.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        const addImageRes: RequestObjetive = await addImageRequest.json();

        if (data.status === "success" && !file) {
          setObjetives([...objetives, data.objetive]);
          setFormState(false);
        }
        if (file && addImageRes.status === "success") {
          setObjetives([...objetives, addImageRes.objetive]);
          setFormState(false);
        }
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: any) => {
    setUserToRegister({
      ...userToRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditObjetiveChange = (e: any) => {
    setEditObjetive({
      ...editObjetive,
      [e.target.name]: e.target.value,
    });
  };

  const handleCode = (e: any) => {
    setCode(e.target.value);
    console.log(code);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const request = await fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await request.json();
      setLoginMessage(data.message);
      if (data.status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
    setLoginLoading(false);
  };

  const addPoint = (numero: number): string => {
    const pointNumber = numero.toLocaleString("de-DE", { minimumFractionDigits: 0 });
    return pointNumber;
  };

  const toEditObjetive = async (id: number) => {
    if (editObjetive) {
      const request = await fetch(`/api/objetive/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editObjetive),
      })
      const data = await request.json();

      if (data.status === "success") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          await fetch(`/api/objetive/add-image/${data.objetive.id}`,
            {
              method: "PUT",
              body: formData,
            }
          );
        }
        setFile(null);
        setEditState(false)
        profile();
      }
    }
  };

  const sendCodeVerification = async () => {
    try {
      const request = await fetch("/api/user/email-verify/save", {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          email: userToRegister.email,
        })
      })
      const data: CreateCodeRequest = await request.json();
      setRegisterMessage(data);
    } catch (error) {
      console.log(error)
    }
  }

  const registerUser = async () => {
    setRegisterLoading(true);
    if (code === "") {
      setRegisterMessage({
        status: "error",
        message: "Ingrese el codigo para verificar su email",
      })
    }
    else {
      try {
        const codeRequest = await fetch("/api/user/email-verify/get", {
          method: "POST",
          headers: {
            "Content-Type": "aplication/json",
          },
          body: JSON.stringify({
            email: userToRegister.email,
            code: code,
          })
        })
        const codeData: CodeRequest = await codeRequest.json();
        if (codeData.status === "success") {
          const request = await fetch("/api/user/register", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "aplication/json",
            },
            body: JSON.stringify(userToRegister),
          })
          const data = await request.json();
          setRegisterMessage({
            status: data.status,
            message: data.message,
          });
          if (data.status === "success") {
            router.push("/");
          }
        }
        else {
          setRegisterMessage(codeData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setRegisterLoading(false);
  };

  const logOut = async () => {
    const request = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    const data = await request.json();
    console.log(data);
    if (data.status === "success") {
      router.push("/login");
    }
  };

  const getPorcent = (progress: number, amount: number) => {
    let num: number = (progress / amount) * 100;
    const porcent = Math.round(num * 100) / 100;
    return porcent;
  };

  const caroucel = async () => { };

  //#region values
  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        objetives,
        setObjetives,
        formState,
        setFormState,
        editState,
        setEditState,
        newObjetive,
        setNewObjetive,
        stadistic,
        setStadistic,
        auth,
        setAuth,
        handleObjetive,
        profile,
        createObjetive,
        handleChange,
        handleRegisterChange,
        handleEditObjetiveChange,
        handleSubmit,
        loginPassword,
        setLoginPassword,
        credentials,
        setCredentials,
        registerPassword,
        setRegisterPassword,
        registerConfirmPassword,
        setRegisterConfirmPassword,
        stateObjetive,
        setStateObjetive,
        stateMoney,
        addPoint,
        editObjetive,
        setEditObjetive,
        toEditObjetive,
        userToRegister,
        setUserToRegister,
        registerUser,
        registerMessage,
        setRegisterMessage,
        logOut,
        getPorcent,
        stateMoneyComplete,
        setStateMoneyComplete,
        stateObjetiveComplete,
        setStateObjetiveComplete,
        caroucelState,
        setCaroucelState,
        caroucel,
        caroucelOb,
        setCaroucelOb,
        page,
        setPage,
        file,
        setFile,
        loginMessage,
        setLoginMessage,
        loginLoading,
        setLoginLoading,
        registerLoading,
        setRegisterLoading,
        code,
        setCode,
        handleCode,
        sendCodeVerification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
