import { Home, Wallet } from "lucide-react";
import { UserCog } from "lucide-react";
import { User } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Send } from "lucide-react";
export const sidebar_links = [
  {
    type: "Overview",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/admin",
      },

      // <Wallet />,
      {
        name: "Users",
        icon: Wallet,
        path: "/admin/users",
      },
    ],
  },
  {
    type: "Pages",
    links: [
      {
        name: "Forms",
        icon: UserCog,
        path: "/admin/forms",
      },
      {
        name: "Departments",
        icon: UserCog,
        path: "/admin/departments",
      },
    ],
  },
  {
    type: "Settings",
    links: [
      {
        name: "Profile",
        icon: User,
        path: "/admin/profile",
      },
    ],
  },
];

export const sidebar_links_user = [
  {
    type: "Overview",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/",
      },
    ],
  },
  {
    type: "Pages",
    links: [
      {
        name: "Suggestion Forms",
        icon: UserCog,
        path: "/forms",
      },
    ],
  },
  {
    type: "Settings",
    links: [
      {
        name: "Profile",
        icon: User,
        path: "/profile",
      },
    ],
  },
];
