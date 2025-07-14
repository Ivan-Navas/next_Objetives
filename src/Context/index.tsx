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
import User from "@/interface/user";
import { Objetives } from "@/interface/objetives";
import { useRouter } from "next/navigation";
import {
  Caroucel,
  CaroucelOb,
  CaroRequest,
  //Caroucel2,
} from "@/interface/caroucel";

const AppContext = createContext<ContextType>({
  objetives: [],
  setObjetives: () => {},
  formState: false,
  setFormState: () => {},
  editState: false,
  setEditState: () => {},
  newObjetive: {
    title: "",
    amount: 0,
    progress: 0,
    image: "",
  },
  setNewObjetive: () => {},
  auth: {
    email: "",
    name: "",
  },
  setAuth: () => {},
  stadistic: {
    objetives: 0,
    objetivesComplete: 0,
    money: 0,
    moneyComplete: 0,
  },
  setStadistic: () => {},
  handleObjetive: () => {},
  profile: () => {},
  createObjetive: () => {},
  handleSubmit: () => {},
  handleChange: () => {},
  handleRegisterChange: () => {},
  handleEditChange: () => {},
  loginPassword: true,
  setLoginPassword: () => {},
  credentials: {
    email: "",
    password: "",
  },
  setCredentials: () => {},
  getProfile: () => {},
  registerPassword: true,
  setRegisterPassword: () => {},
  registerConfirmPassword: true,
  setRegisterConfirmPassword: () => {},
  stateObjetive: 0,
  setStateObjetive: () => {},
  stateMoney: 0,
  addPoint: () => "",
  editObjetive: {
    amount: 0,
    title: "",
    progress: 0,
  },
  setEditObjetive: () => {},
  toEditObjetive: () => {},
  userToRegister: {
    email: "",
    name: "",
    password: "",
  },
  SetUserToRegister: () => {},
  registerUser: () => {},
  registerMessage: "",
  setRegisterMessage: () => {},
  logOut: () => {},
  getPorcent: () => 0,
  stateMoneyComplete: 0,
  setStateMoneyComplete: () => {},
  stateObjetiveComplete: 0,
  setStateObjetiveComplete: () => {},
  caroucelState: {
    status: "",
    message: "",
    caroucel: [],
  },
  setCaroucelState: () => {},
  caroucel: () => {},
  caroucelOb: {
    title: "",
    page: 0,
    objetive: {
      title: "",
      progress: 0,
      amount: 0,
    },
  },
  setCaroucelOb: () => {},
  page: 0,
  setPage: () => {},
  file: "",
  setFile: () => {},
});

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  //#region states/variables
  const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API;
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
  const [registerMessage, setRegisterMessage] = useState<string>("");
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
  const [userToRegister, SetUserToRegister] = useState<UserToRegister>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  //const [caroucelState2, setCaroucelState2] = useState<Caroucel>({
   // card: [],
  //});
  const [caroucelState, setCaroucelState] = useState<CaroRequest>({
    status: "",
    message: "",
    caroucel: [],
  });
  const [caroucelOb, setCaroucelOb] = useState<CaroucelOb>({
    title: "",
    page: 0,
    objetive: {
      title: "",
      progress: 0,
      amount: 0,
    },
  });
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<any>(null);

  //#region functions
  const handleObjetive = (e: any) => {
    setNewObjetive({
      ...newObjetive,
      [e.target.name]: e.target.value,
    });
  };

  const profile = async () => {
    const request = await fetch(`${apiUrl}/user/profile`);
    const data = await request.json();
    setAuth(data.user);
    const obRequest = await fetch(`${apiUrl}/objetive/get/${data.user.id}`, {
      method: "GET",
    });
    const obData: Objetives = await obRequest.json();
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
    const caroucelReq = await fetch(`${apiUrl}/objetive/caroucel`);
    const caroucelData: CaroRequest = await caroucelReq.json();
    if (caroucelData.status === "success") {
      setCaroucelState(caroucelData);
      setCaroucelOb(caroucelData.caroucel[page]);
    }
    setStateObjetive(obData.objetives.length);
    return data.user;
  };

  const createObjetive = async () => {
    if (newObjetive.title !== "") {
      try {
        const response = await fetch(`${apiUrl}/objetive/create`, {
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
          `${apiUrl}/objetive/add-image/${data.objetive.id}`,
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
    SetUserToRegister({
      ...userToRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    console.log(credentials);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
      if(data.status === "success"){
        router.push("/feed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async (e: any) => {
    e.preventDefault();
    const request = await fetch(`${apiUrl}/user/profile`);
    const data = await request.json();
  };

  const addPoint = (numero: number): string => {
    const point = numero.toLocaleString();
    return point;
  };

  const toEditObjetive = async (id: any) => {
    const title: HTMLInputElement | null = document.getElementById(
      "title"
    ) as HTMLInputElement | null;
    const amount: HTMLInputElement | null = document.getElementById(
      "amount"
    ) as HTMLInputElement | null;
    const progress: HTMLInputElement | null = document.getElementById(
      "progress"
    ) as HTMLInputElement | null;

    if (title && amount && progress) {
      const request = await fetch(`${apiUrl}/objetive/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          amount: amount.value,
          progress: progress.value,
        }),
      }).finally(() => {
        profile();
        setEditState(false);
      });
    }
  };

  const registerUser = async () => {
    try {
      const request = await fetch("/api/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(userToRegister),
      })
      const data = await request.json();
      if(data.status === "success"){
        router.push("/feed");
      }
    } catch (error) {
      console.error(error);  
    }
  };

  const logOut = async () => {
    const request = await fetch(`${apiUrl}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    const data = await request.json();
    if(data.status === "success"){
      router.push("/login");
    }
  };

  const getPorcent = (progress: number, amount: number) => {
    let num: number = (progress / amount) * 100;
    const porcent = Math.round(num * 100) / 100;
    return porcent;
  };

  const caroucel = async () => {};

  //#region values
  return (
    <AppContext.Provider
      value={{
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
        handleEditChange,
        handleSubmit,
        loginPassword,
        setLoginPassword,
        credentials,
        setCredentials,
        getProfile,
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
        SetUserToRegister,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
