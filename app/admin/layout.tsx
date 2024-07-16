"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/Navbar";
import { ThemeProvider } from "@/components/utils/theme_provider";
import ProgressBar from "next-nprogress-bar";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loading } from "@/components/loading";

const Layout = ({ children }: { children: ReactNode }) => {
  const { userIdentity, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!userIdentity) {
      router.push("/auth/signin");
    }
    if (userIdentity && user && user.role !== "admin") {
      router.push("/auth/signin");
    }
  }, [userIdentity, user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      forcedTheme="light"
    >
      <ProgressBar
        height="3px"
        color="000"
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
      />
      <div className="bg-background min-h-screen max-w-screen">
        <div
          className="hidden md:flex
             md:w-[250px] md:fixed h-full z-[5]"
        >
          <Sidebar />
        </div>
        <div className="w-full md:pl-[250px] relative ">
          <div className="sticky bg-card top-0 fc h-[70] md:h-[90px] border-b border-borhder  z-[10]">
            <NavBar />
          </div>
          <div className="z-[2] rpx py-4 md:py-6 ">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
