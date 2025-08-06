"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { login } from "@/features/login/loginSlice";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { get } from "http";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .length(12, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only digits"),
});

type Login = z.infer<typeof loginSchema>;

const LoginCard = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    trigger,
  } = useForm<Login>({
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onsubmit: SubmitHandler<Login> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleLogin(data);
  };

  const handleLogin = (data: Login) => {
    localStorage.setItem("loggedIn", JSON.stringify(true));
    dispatch(login({ loggedIn: true, name: "" }));
    router.push(`/chats/${nanoid()}`);
  };

  const handleSendOtp = async () => {
    const valid = await trigger("phoneNumber");
    if (valid) {
      setOtpSent(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="min-w-[400px] flex flex-col gap-4 items-start p-6 rounded-[16px] bg-white"
    >
      <p className="w-full font-bold text-4xl text-center">Login</p>
      <label className="w-full flex flex-col gap-2">
        <p className="font-medium">Phone Number</p>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PhoneInput
              {...field}
              country={"in"}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputProps={{
                name: "phone",
                required: true,
              }}
              inputClass="!w-full !p-4 !pl-[48px] !h-[40px] !rounded-[5px] !border !border-gray-300"
            />
          )}
        />
      </label>
      {errors.phoneNumber && (
        <p className="text-red-500">{errors.phoneNumber.message}</p>
      )}
      {otpSent && (
        <label className="w-full flex flex-col gap-2">
          <p className="font-medium">OTP</p>
          <input
            type="text"
            className=" bg-white border border-gray-300 rounded-[5px] p-2 focus:outline-none"
            maxLength={6}
            {...register("otp", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
          />
        </label>
      )}
      {errors.otp && otpSent && (
        <p className="text-red-500">{errors.otp.message}</p>
      )}
      {otpSent ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          key={"verify"}
          className="w-full p-6"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      ) : (
        <Button
          type="button"
          key={"login"}
          onClick={() => handleSendOtp()}
          className="w-full p-6 text-[16px]"
        >
          Login
        </Button>
      )}
    </form>
  );
};

export default LoginCard;
