"use client";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { Stat_Card, StatCardWrapper } from "@/components/shared/Stat_Card";
import { ClipboardPlus } from "lucide-react";
import React from "react";
import { GrUserWorker } from "react-icons/gr";
import { AiOutlinePayCircle } from "react-icons/ai";
import { TbRadioactive } from "react-icons/tb";
import { LuPanelBottomInactive } from "react-icons/lu";
import { UsersTable } from "@/components/pagesUIs/users_table";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { useGetDepartments } from "@/lib/hooks/useDepartments";
const Page = () => {
  const { data: users } = useGetUsers();
  const { data: departments } = useGetDepartments();
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Users" link="/users" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <StatCardWrapper title="Employers on Platform">
        <Stat_Card
          title={users ? users.length : "..."}
          description="Students on Platform"
          icon={GrUserWorker}
        />
        <Stat_Card
          title={
            users
              ? users.filter((user) => user.status === "active").length
              : "..."
          }
          description="Active Accounts"
          icon={TbRadioactive}
        />
        <Stat_Card
          title={
            users
              ? users.filter((user) => user.status === "inactive").length
              : "..."
          }
          description="Inactive Accounts"
          icon={LuPanelBottomInactive}
        />
        <Stat_Card
          title={departments ? departments.length : "..."}
          description="Depatments"
          icon={LuPanelBottomInactive}
        />
      </StatCardWrapper>
      <div className="  rounded-lg md:border border-border/50 bg-card ">
        <div className=" fbc border-b border-border rp ">
          <h4 className="h3 ">Students on Platform</h4>
        </div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Page;
