"use client";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { Stat_Card, StatCardWrapper } from "@/components/shared/Stat_Card";
import { ClipboardPlus } from "lucide-react";
import React, { useMemo } from "react";
import { FaFileWaveform, FaWpforms } from "react-icons/fa6";
import { MdCommentsDisabled } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { RiDraftLine } from "react-icons/ri";
import { FormsTable } from "@/components/pagesUIs/forms_table";
import Link from "next/link";
import { useGetForms } from "@/lib/hooks/useForm";
const Forms = () => {
  const { data: forms, isLoading } = useGetForms();
  const fSumm = useMemo(() => {
    let activeForms = forms?.filter((form) => form.status == "active").length;
    let inactiveForms = forms?.filter(
      (form) => form.status == "inactive"
    ).length;
    let draftForms = forms?.filter((form) => form.published == false).length;
    let publishedForms = forms?.filter((form) => form.published == true).length;
    return { activeForms, inactiveForms, draftForms, publishedForms };
  }, [forms]);
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Forms" link="/admin/Forms" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <StatCardWrapper title="Forms Created on Platform">
        <Stat_Card
          title={fSumm.activeForms || 0}
          description="Forms crected"
          icon={FaWpforms}
        />
        <Stat_Card
          title={fSumm.publishedForms || 0}
          description="Published Forms"
          icon={FaFileWaveform}
        />

        <Stat_Card
          title={fSumm.inactiveForms || 0}
          description="Inactive Forms"
          icon={MdCommentsDisabled}
        />
        <Stat_Card
          title={fSumm.draftForms || 0}
          description="Draft Forms"
          icon={RiDraftLine}
        />
      </StatCardWrapper>
      <div className="  rounded-lg md:border border-border/50 bg-card ">
        <div className=" fbc border-b border-border rp ">
          <h4 className="h3 ">Forms</h4>
          <Link href={"/admin/forms/new"}>
            <Button className="fic gap-2">
              <FaWpforms size={17} />
              <span>Add Form</span>
            </Button>
          </Link>
        </div>
        <FormsTable />
      </div>
    </div>
  );
};

export default Forms;
