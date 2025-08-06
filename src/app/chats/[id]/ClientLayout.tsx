"use client";

import { setChatRooms } from "@/features/chatRooms/chatRoomsSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const login = useSelector((state: any) => state.login);

  useEffect(() => {
    if (login.loggedIn === undefined || login.loggedIn === null) return;

    if (login.loggedIn) {
      router.push("/chats");
    } else {
      router.push("/login");
    }
  }, [login]);

  return <>{children}</>;
};

export default ClientLayout;
