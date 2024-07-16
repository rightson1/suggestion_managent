"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProgressBar from "next-nprogress-bar";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { AuthProvider } from "./AuthProvider";

const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <SonnerToaster />

      <ProgressBar
        height="6px"
        color="000"
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
      />
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Client;
