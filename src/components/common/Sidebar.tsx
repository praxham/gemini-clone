"use client";
import { Menu, Search, Settings, SquarePen } from "lucide-react";
import React, { use, useState } from "react";
import { Button } from "../ui/button";
import ChatRooms from "../recentChats/ChatRooms";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [minimise, setMinimise] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`transition-all duration-300 ease-in-out
    ${minimise ? "w-[64px] items-center" : "w-[15%] items-start"} 
    h-screen bg-[#282A2C] text-white p-4 flex flex-col gap-8 text-[14px]`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Button
          onClick={() => setMinimise((prev) => !prev)}
          className="bg-[#282A2C] rounded-full cursor-pointer"
        >
          <Menu size={18} />
        </Button>
        {!minimise && <Search className="cursor-pointer" size={18} />}
      </div>
      <Button
        onClick={() => router.push(`/chats/${nanoid()}`)}
        className="w-full bg-transparent hover:bg-[#3D4043] cursor-pointer"
      >
        <div className="flex flex-row gap-2 items-center mr-auto">
          <SquarePen size={18} />
          {!minimise && <p>New Chat</p>}
        </div>
      </Button>
      <div className="w-full flex flex-col gap-2">
        {!minimise && <p>Recent</p>}
        <ChatRooms />
      </div>
      <div className="mt-auto flex flex-row gap-4 items-center">
        <Settings size={18} />
        {!minimise && <p>Settings and help</p>}
      </div>
    </div>
  );
};

export default Sidebar;
