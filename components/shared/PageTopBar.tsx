import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Custom_Bread_Crumb } from "../atoms/ui";

type Props = {
  title: string;
  link: string;
  linkTitle?: string;
  btn?: string;
};

export const PageTitle = (props: Props) => {
  return (
    <div className="flex items-start gap-2">
      <div className="flex  flex-col  ">
        <div className="h4">{props.title}</div>
        <Custom_Bread_Crumb
          link={props.link}
          title={props.linkTitle ?? props.title}
        />
      </div>
      {props.btn && (
        <Badge
          variant={"secondary"}
          className="bg-third/20 text-third py-1 mt-1"
        >
          {props.btn}
        </Badge>
      )}
    </div>
  );
};

export const BarButton = (props: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}) => {
  return (
    <Button
      variant={"outline"}
      className="hidden md:flex gap-2 px-4  "
      size={"default"}
    >
      <span className="  rounded-lg bg-accent p-2">
        <props.icon height={13} width={13} />
      </span>
      {props.text}
    </Button>
  );
};
export const BarButtonWrapper = (props: { children: React.ReactNode }) => {
  return <div className="fbc gap-2">{props.children}</div>;
};
