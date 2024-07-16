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
import { useCreateNewUser } from "@/lib/hooks/useUsers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
const Page = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: createUser } = useCreateNewUser();
  const router = useRouter();
  const submit = async () => {
    let id = "";
    customToast({
      func: async () => {
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (userCredentials) => {
            const { uid } = userCredentials.user;
            id = uid;
          }
        );
        await createUser({
          departments: [],
          email,
          displayName,
          uid: id,
          role: "admin",
          status: "active",
        });
      },
      sfunc: async () => {
        router.push("/auth/admin-signin");
      },
    });
  };
  return (
    <>
      <Auth_UI
        title="Welcome back,"
        description="There could be Updates Waiting for You"
      >
        <Card className=" w-full md:w-[400px] min-h-[360px] flex-col">
          <CardHeader>
            <CardTitle className="text-xl  font-bold text-primary">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <form>
              <div className="grid w-full items-center gap-4">
                <LabeledInput label="Your Name" id="displayName">
                  <Input
                    placeholder="Your Name"
                    name="name"
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                    }}
                  />
                </LabeledInput>
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </LabeledInput>
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
            </form>
          </CardContent>
          <CardFooter className="flex  justify-end">
            <Button disabled={loading} onClick={submit}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </Auth_UI>
    </>
  );
};

export default Page;
