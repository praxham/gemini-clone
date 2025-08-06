"use client";
import { setChatRooms } from "@/features/chatRooms/chatRoomsSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const login = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login.loggedIn === undefined || login.loggedIn === null) return;
    if (login.loggedIn) {
      router.push("/chats");
    } else {
      router.push("/login");
    }
  }, [login]);

  return <div>{children}</div>;
};

export default layout;
