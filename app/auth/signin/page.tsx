"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "@/components/shared/PasswordInput";
import Link from "next/link";
import { Auth_UI } from "@/components/shared/AuthUI";
import { LabeledInput } from "@/components/atoms/ui";
import { useCustomToast } from "@/components/atoms/function";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { eCheck } from "@/lib/utils";
import { IUser } from "@/lib/types/data_types";

const Page = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { customToast, loading } = useCustomToast();
  const router = useRouter();
  const submit = async () => {
    let role = "";
    customToast({
      func: async () => {
        await signInWithEmailAndPassword(auth, email, password);
        await axios
          .get("/api/users", {
            params: {
              email,
            },
          })
          .then(eCheck)
          .then((res: IUser) => {
            role = res.role;
          });
      },
      sfunc() {
        const link = role == "admin" ? "/admin" : "/";
        console.log(link);
        window.location.href = link;
      },
    });
  };
  return (
    <>
      <Auth_UI
        title="Welcome back,"
        description="There could be Updates Waiting for You"
      >
        <Card className=" w-full md:w-[350px] min-h-[360px] flex-col">
          <CardHeader>
            <CardTitle className="text-xl  font-bold text-primary">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <form>
              <div className="grid w-full items-center gap-4">
                <LabeledInput label="Email" id="email">
                  <Input
                    placeholder="name@example.com"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </LabeledInput>
                <LabeledInput label="Password" id="password">
                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                  />
                </LabeledInput>
                <div className="flex flex-wrap gap-2">
                  <p className="flex text-sm">
                    <span className="">Dont Have an Account?</span>
                    <Link
                      className="text-primary ml-1 underline"
                      href="/auth/signup"
                    >
                      Create Account
                    </Link>
                  </p>
                  <p className="flex text-sm">
                    <span className="">Forgot Password?</span>
                    <Link
                      className="text-primary ml-1 underline"
                      href="/auth/forgot-password"
                    >
                      Reset Password
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex  justify-end">
            <Button
              onClick={() => {
                submit();
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </Auth_UI>
    </>
  );
};

export default Page;
