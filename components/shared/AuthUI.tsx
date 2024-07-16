"use client";
import Image from "next/image";
import React from "react";

export const Auth_UI = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col h-full ">
      <div className="gap-10 flex flex-col md:flex-row h-full pt-4 ">
        <div className=" w-full  gap-5 justify-between flex  flex-col  md:py-0 items-center md:justify-start  md:pt-14 md:pl-32 md:items-start">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="h-[75px] w-[100px] md:w-[100px] md:h-[100px]"
          />
          <div className="md:py-20 space-y-1 text-white text-center md:text-start">
            <h6 className="text-sm font-semibold">{title}</h6>
            <h2 className="text-[20px] max-w-[300px] md:max-w-[600px] md:text-[36px] font-bold">
              {description}
            </h2>
          </div>
        </div>
        <div className=" w-full px-4 flex justify-center h-full  items-start md:items-center  md:h-full  md:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
};
