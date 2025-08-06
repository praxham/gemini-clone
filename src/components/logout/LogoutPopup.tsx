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

const LogoutPopup = ({ openLogoutPopup, setOpenLogoutPopup }: any) => {
  const getLogin = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    dispatch(login({ loggedIn: false, name: "" }));
    console.log("login", getLogin);
    router.push("/");
  };

  return (
    <AlertDialog open={openLogoutPopup} onOpenChange={setOpenLogoutPopup}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your current session. You can log back in
            anytime using your credentials.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenLogoutPopup(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleLogout()}>
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutPopup;
