import { AddDepartment } from "@/components/pagesUIs/add_department";
import { UsersDepartments } from "@/components/pagesUIs/students_table";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { ClipboardPlus } from "lucide-react";
import React from "react";
const Page = () => {
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Departments" link="/departments" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>

      <div className="  rounded-lg md:border border-border/50 bg-card ">
        <div className=" fbc border-b border-border rp ">
          <h4 className="h3 ">Students on Platform</h4>
          <AddDepartment />
        </div>
        <UsersDepartments />
      </div>
    </div>
  );
};

export default Page;
