import { LucideProps } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IconType } from "react-icons/lib";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Stat_Card = (props: {
  title: string | number;
  description: string;
  icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >
    | IconType;
}) => {
  return (
    <Card className="w-full h-full flex items-center  px-4 py-5 gap-5">
      <Avatar className="text-primary h-12  w-12">
        <AvatarFallback>
          <props.icon size={25} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className="h5">{props.title}</h3>
        <span className="text-sm">{props.description}</span>
      </div>
    </Card>
  );
};

export const StatCardWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="rp rounded-lg md:border border-border/50 space-y-3 bg-card">
      <div className="fb">
        <div className="flex  flex-col ">
          <div className="h5">{title}</div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid-1-4">{children}</div>
    </div>
  );
};
