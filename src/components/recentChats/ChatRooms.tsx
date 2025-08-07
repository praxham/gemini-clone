import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatRoomCard from "./ChatRoomCard";
import { RootState } from "@/store/store";

interface ChatRoom {
  id: string;
  name: string;
  chats: Chat[];
}

interface Chat {
  message: string;
  images?: string[];
  from: string;
}

const ChatRooms = () => {
  const chatRooms = useSelector(
    (state: RootState) => state.chatRooms.chatRooms
  );
  return (
    <div className="w-full flex flex-col gap-1">
      {Array.isArray(chatRooms) &&
        chatRooms.length > 0 &&
        chatRooms?.map((chatRoom: ChatRoom, index) => (
          <ChatRoomCard key={chatRoom?.id || index} chatRoom={chatRoom} />
        ))}
    </div>
  );
};

export default ChatRooms;
