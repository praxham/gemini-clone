import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeChatRoom } from "@/features/chatRooms/chatRoomsSlice";
import { useParams, useRouter } from "next/navigation";
import DeleteChatRoomPopup from "./DeleteChatRoomPopup";

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

const ChatRoomCard = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  const [showDeleteChatRoomPopup, setShowDeleteChatRoomPopup] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <div
      onClick={() => router.push(`/chats/${chatRoom?.id}`)}
      className={`w-full group flex flex-row p-2 h-[32px] justify-between items-center hover:bg-[#3D4043] rounded-[5px] cursor-pointer ${
        chatRoom?.id === params.id && "bg-[#3D4043]"
      }`}
    >
      <p className="line-clamp-1 break-all mr-6">
        {chatRoom?.name || "New Chat"}
      </p>
      <Trash
        size={16}
        onClick={(e) => {
          e.stopPropagation();
          setShowDeleteChatRoomPopup((prev) => !prev);
        }}
        className="group-hover:block hidden cursor-pointer"
      />
      <DeleteChatRoomPopup
        showDeleteChatRoomPopup={showDeleteChatRoomPopup}
        setShowDeleteChatRoomPopup={setShowDeleteChatRoomPopup}
        chatRoom={chatRoom}
      />
    </div>
  );
};

export default ChatRoomCard;
