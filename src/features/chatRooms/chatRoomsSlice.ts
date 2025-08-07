import { createSlice } from "@reduxjs/toolkit";

const initialState: { chatRooms: ChatRoom[] } = {
  chatRooms: [],
};

interface ChatRoom {
  id: string;
  name: string;
  chats: Chat[];
}

interface Chat {
  message: string;
  images?: string[];
  from: string;
  time: string;
}

export const chatRoomsSlice = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    createChatRoom: (state, action) => {
      const chatsArray = action?.payload?.chatsData?.chats;
      const firstUserMessage = chatsArray
        ?.find((chat: Chat) => chat.from === "user")
        ?.message?.toLowerCase()
        ?.slice(0, 64);
      state.chatRooms.push({
        id: action.payload.chatsData?.chatRoomId,
        name: firstUserMessage,
        chats: action.payload.chatsData?.chats,
      });
    },

    removeChatRoom: (state, action) => {
      state.chatRooms = state.chatRooms.filter(
        (chatRoom) => chatRoom.id !== action.payload.chatRoomId
      );
    },

    addChat: (state, action) => {
      const chatRoom: ChatRoom | undefined = state.chatRooms.find(
        (chatRoom) => chatRoom.id === action.payload.chatsData?.chatRoomId
      );
      if (chatRoom) {
        chatRoom.chats = action.payload.chatsData?.chats;
      }
    },

    setChatRooms: (state, action) => {
      state.chatRooms = action.payload.chatRooms;
    },
  },
});

export const { createChatRoom, removeChatRoom, addChat, setChatRooms } =
  chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;
