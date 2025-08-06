"use client";

import { login } from "@/features/login/loginSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const getlogin = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");
    dispatch(login({ loggedIn, name: "" }));
  }, []);

  useEffect(() => {
    if (getlogin.loggedIn) {
      router.push(`/chats/${nanoid()}`);
    } else {
      router.push("/login");
    }
  }, [getlogin]);

  return <div className="w-screen h-screen overflow-none flex flex-row"></div>;
}
