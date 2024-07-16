"use client";
import { Home, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { sidebar_links, sidebar_links_user } from "./sidebar_links";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "./providers/AuthProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const { role } = useAuth();
  const [isActive, setIsActive] = React.useState(pathname);
  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);
  const links = role === "admin" ? sidebar_links : sidebar_links_user;
  return (
    <div className="h-full w-full bg-card border-r border-b ">
      <div className="h-[90px] p-4 flex items-center justify-start border-b border-border">
        <Image
          height={130}
          width={130}
          unoptimized
          src="/logo.png"
          alt="logo"
        />
      </div>
      <div className="p-4 ">
        <div className="links flex flex-col gap-3">
          {links.map((category, index) => {
            return (
              <div key={index}>
                <h4 className="h6 text-grayish">{category.type}</h4>
                <div className="flex flex-col ">
                  {category.links.map((link, index) => {
                    const active =
                      role == "admin"
                        ? pathname.split("/")[2] === link.path.split("/")[2]
                        : pathname.split("/")[1] === link.path.split("/")[1];

                    return (
                      <Button
                        variant={active ? "link" : "ghost"}
                        key={index}
                        className={cn(
                          "flex items-center justify-start ",
                          active && "gap-1 -ml-2"
                        )}
                        asChild
                      >
                        <Link href={link.path}>
                          {active && (
                            <div className="h-full w-[4px] rounded-r-lg bg-primary" />
                          )}
                          <link.icon height={20} width={20} className="mr-2 " />
                          <span className="text-sm font-[500]">
                            {link.name}
                          </span>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
