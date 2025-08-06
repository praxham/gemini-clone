import React, { useState } from "react";
import { DropdownMenuCheckboxes } from "./DropdownMenuCheckboxes";
import { Button } from "../ui/button";
import geminiIcon from "../../../public/assets/navbar/gemini-color.svg";
import Image from "next/image";
import LogoutPopup from "../logout/LogoutPopup";

const Navbar = () => {
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center text-white p-4">
      <div className="flex flex-col gap-2 items-start">
        <p className="text-[18px] font-medium text-gray-400">Gemini</p>
        <DropdownMenuCheckboxes />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button
          onClick={() =>
            window.open(
              "https://one.google.com/explore-plan/gemini-advanced",
              "_blank"
            )
          }
          className="text-white bg-[#3D3F42] flex flex-row gap-2 cursor-pointer"
        >
          <Image className="w-[16px]" src={geminiIcon} alt="gemini" />
          Upgrade
        </Button>
        <div
          onClick={() => setOpenLogoutPopup(true)}
          className="w-[36px] aspect-square rounded-full bg-linear-to-br from-pink-300 to-pink-600 cursor-pointer"
        />
      </div>
      <LogoutPopup
        openLogoutPopup={openLogoutPopup}
        setOpenLogoutPopup={setOpenLogoutPopup}
      />
    </div>
  );
};

export default Navbar;
