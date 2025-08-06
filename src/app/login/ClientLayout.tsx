"use client";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const login = useSelector((state: any) => state.login);

  useEffect(() => {
    if (login.loggedIn === undefined || login.loggedIn === null) {
      return;
    }
    if (login.loggedIn) {
      console.log("login, redirectin", login);
      router.push(`/chats/${nanoid()}`);
    }
  }, [login]);

  return <div>{children}</div>;
};

export default layout;
