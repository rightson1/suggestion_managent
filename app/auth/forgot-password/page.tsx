"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Auth_UI } from "@/components/shared/AuthUI";
import { LabeledInput } from "@/components/atoms/ui";
const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const submit = () => {
    if (email === "") {
      return toast({
        title: "Email is required",
      });
    }
    router.push("/auth/otp");
  };
  return (
    <Auth_UI
      title="Relax, you’ve got this"
      description="Recover your password in 3 steps"
    >
      <Card className="w-[350px] min-h-[360px] flex flex-col ">
        <CardHeader>
          <div className="flex gap-4">
            <Link href={"/auth/signin"} className="cursor-pointer">
              <FaArrowLeft className="text-2xl" />
            </Link>
            <CardTitle className="text-primary text-xl font-bold ">
              Confirm your Email
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow h-full ">
          <div className="grid w-full items-center gap-4">
            <LabeledInput label="Email" id="email">
              <Input
                placeholder="name@example.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabeledInput>
          </div>
        </CardContent>
        <CardFooter className="flex  justify-end ">
          <Button onClick={submit}>Confirm Email</Button>
        </CardFooter>
      </Card>
    </Auth_UI>
  );
};

export default Page;
