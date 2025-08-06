import { chatRoomsSlice } from "@/features/chatRooms/chatRoomsSlice";
import { loginSlice } from "@/features/login/loginSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    chatRooms: chatRoomsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
