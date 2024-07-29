import { UserForms } from "@/components/pagesUIs/userForms";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { ClipboardPlus } from "lucide-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Forms" link="/forms" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <UserForms />
    </div>
  );
}
