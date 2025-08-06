"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CircleCheck } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const [selectedModel, setSelectedModel] = React.useState<string>("2.5 Flash");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-gray-400 bg-[#282A2C] rounded-full flex flex-row gap-1 outline-none">
          {selectedModel}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 bg-[#282A2C] outline-none border-none text-white text-[12px]">
        <DropdownMenuLabel>Choose your model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onCheckedChange={() => setSelectedModel("2.5 Flash")}
          className="flex flex-row justify-between items-center px-2"
        >
          <div className="flex flex-col items-start">
            <p className="font-medium">Fast all round help</p>
            <p>2.5 Flash</p>
          </div>
          {selectedModel === "2.5 Flash" && (
            <CircleCheck size={24} className="" />
          )}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onCheckedChange={() => setSelectedModel("2.5 Pro")}
          className="flex flex-row justify-between items-center px-2"
        >
          <div className="flex flex-col items-start">
            <p className="font-medium">Reasoning, maths and code</p>
            <p>2.5 Pro</p>
          </div>
          {selectedModel === "2.5 Pro" && (
            <CircleCheck size={24} className="" />
          )}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="flex flex-row gap-8 items-center pointer-events-none px-2">
          <div className="flex flex-col items-start">
            <p className="text-nowrap font-medium">Upgrade to Google AI Pro</p>
            <p>
              Get our most capable <br />
              models and features
            </p>
          </div>
          <Button className="bg-[#333537] rounded-full cursor-pointer">
            Upgrade
          </Button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
