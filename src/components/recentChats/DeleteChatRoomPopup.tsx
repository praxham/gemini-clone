import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/login/loginSlice";
import { useRouter } from "next/navigation";
import { setChatRooms } from "@/features/chatRooms/chatRoomsSlice";
import { Button } from "../ui/button";

const DeleteChatRoomPopup = ({
  showDeleteChatRoomPopup,
  setShowDeleteChatRoomPopup,
  chatRoom,
}: any) => {
  const getChatRooms = useSelector((state: any) => state.chatRooms);
  const dispatch = useDispatch();
  const router = useRouter();

  const chatRoomDelete = () => {
    const updatedChatRooms = getChatRooms.chatRooms.filter(
      (room: any) => room.id !== chatRoom.id
    );
    dispatch(setChatRooms({ chatRooms: updatedChatRooms }));
    localStorage.setItem("chatRooms", JSON.stringify(updatedChatRooms));
    setShowDeleteChatRoomPopup(false);
  };

  return (
    <AlertDialog
      open={showDeleteChatRoomPopup}
      onOpenChange={setShowDeleteChatRoomPopup}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this chatroom?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The entire chat history of this
            chatroom will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setShowDeleteChatRoomPopup(false)}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => chatRoomDelete()}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatRoomPopup;
