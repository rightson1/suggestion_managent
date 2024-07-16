import { Label } from "@/components/ui/label";
import { LucideProps } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IconType } from "react-icons/lib";
import Link from "next/link";

interface LabeledInputProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  ...props
}) => {
  return (
    <div className={`w-full space-y-2 `}>
      <Label htmlFor={id}>{label}</Label>
      {props.children}
    </div>
  );
};
export const Custom_Bread_Crumb = ({
  link,
  title,
}: {
  link: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Link href={"/"} className="text-grayish">
        Home
      </Link>
      /
      <Link href={link} className="capitalize">
        {title}
      </Link>
    </div>
  );
};
