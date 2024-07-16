import React from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, User, Power } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiSettingsFill } from "react-icons/ri";
import Link from "next/link";
import { SideDrawer } from "./side_drawer";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { PageSearch } from "./PageSearch";
import { useAuth } from "./providers/AuthProvider";

const Navbar = () => {
  return (
    <div className="px-4 w-full">
      <div className="bg-card w-full md:px-4 py-2 rounded-lg fbc md:border md:border-border border-opacity-0 dark:border-border/90">
        <div className="flex md:hidden">
          <SideDrawer />
        </div>
        <div className="hidden md:flex">
          <NavLeftSide />
        </div>

        <NavRightSide />
      </div>
    </div>
  );
};

const NavLeftSide = () => {
  return <PageSearch />;
};
const NavRightSide = () => {
  return (
    <div className="fbc gap-2">
      <div className="fbc">
        <NotificationsDrawer />
      </div>
      <UserSettings />
    </div>
  );
};

const UserSettings = () => {
  const { user, logout, role } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="fbc gap-2 px-1">
          <Avatar className="w-8 h-8 ">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="fbc gap-4 m-hidden">
            <span className="">{user?.displayName}</span>
            <ChevronDown size={19} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px] cursor-pointer">
        <DropdownMenuItem className="fic gap-2" asChild>
          <Link
            href={role === "admin" ? "/admin/profile" : "/profile"}
            className="w-full cursor-pointer"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="fic gap-2 cursor-pointer" onClick={logout}>
          <Power size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Navbar;
