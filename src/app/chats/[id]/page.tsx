"use client";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import ChatSection from "@/components/chat/ChatSection";
import React from "react";

const ChatPage = () => {
  return (
    <div className="w-screen h-screen overflow-none flex flex-row">
      <Sidebar />
      <div className="w-full h-screen flex flex-col bg-[#1B1C1D]">
        <Navbar />
        <ChatSection />
      </div>
    </div>
  );
};

export default ChatPage;
