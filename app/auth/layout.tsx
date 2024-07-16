"use client";

import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div
      className="bg-[#180247] h-screen overflow-hidden w-full
    relative 
    flex flex-col 
    "
    >
      <Image
        className="absolute -left-10 md:top-0 md:left-0 h-full z-[1]"
        src={"/auth-grad-1.svg"}
        alt="Grad"
        height={1000}
        width={500}
      />
      <Image
        className="absolute top-0 -right-20 h-full hidden md:flex z-[1]"
        src={"/auth-grad-2.svg"}
        alt="Grad"
        height={1000}
        width={500}
      />

      <div className="flex-grow z-[2] h-full">{props.children}</div>
      <div className="w-full justify-center flex pb-4">
        <span className="text-white/70 text-sm">
          © 2024 Lemmy. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Layout;
