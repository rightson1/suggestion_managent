"use client";
import Pie from "@/components/data/pie_chart";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { Stat_Card } from "@/components/shared/Stat_Card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  CalendarDays,
  ClipboardPlus,
  LucideProps,
  Pi,
  User,
  UserCog,
} from "lucide-react";
import React, { useEffect } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GiMicrophone } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/components/data";
import { HomePageTable } from "@/components/pagesUIs/homePageTable";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { useGetForms } from "@/lib/hooks/useForm";
import { useGetDepartments } from "@/lib/hooks/useDepartments";

const AdminPage = () => {
  const { data: users } = useGetUsers();
  const { data: forms } = useGetForms();
  const { data: departments } = useGetDepartments();
  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Dashboard" link="/" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>

      <div className="rp bg-card    grid-1-2-3 gap-3 rounded-lg md:border border-border/50">
        <div className=" flex flex-col gap-3">
          <Stat_Card
            title={forms?.length || ".."}
            description="Suggestion Forms"
            icon={MdOutlineAccountBalanceWallet}
          />
          <Stat_Card
            title={
              forms?.filter((form) => form.status === "active").length || ".."
            }
            description="10 Active Forms"
            icon={GrTransaction}
          />
        </div>

        <Card className="fc flex-col p-4 gap-5 py-5">
          <div className="fc flex-col">
            <div className="h4">Departments</div>
            <p>Department Details </p>
          </div>

          <Separator className="w-full" />
          <div className="fc flex-col w-full gap-3">
            <Bids
              title="Departments"
              icon={Briefcase}
              value={departments?.length || ".."}
            />
            <Bids
              title="Total Users"
              icon={Briefcase}
              value={users?.length || ".."}
            />
          </div>
        </Card>

        <div className=" flex flex-col gap-3">
          <Stat_Card
            title={users?.length || ".."}
            description="Users On Platform"
            icon={GiMicrophone}
          />
          <Stat_Card title={1} description="Admins  on Platform" icon={User} />
        </div>
        <div className="">
          <PieCard title="Suggestion Approval" />
        </div>
        <div className="col-span-2 border-border border p-4 rounded-lg ">
          <HomePageTable />
        </div>
      </div>
    </div>
  );
};

const PieCard = ({ title }: { title: string }) => {
  const { data: forms } = useGetForms();
  const thisMonth = months[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = React.useState<string>(thisMonth);
  const [data, setData] = React.useState<
    { x: string; y: number; color: string }[]
  >([]);
  useEffect(() => {
    if (!forms) return;
    const data = [
      {
        x: "Inactive Forms",
        y: forms.filter((form) => form.status === "inactive").length,
        color: "#EDB900",
      },
      {
        x: "Active Forms",
        y: forms.filter((form) => form.status === "active").length,
        color: "#000EF8",
      },
    ];
    setData(data);
  }, [forms]);

  return (
    <Card className="p-4">
      <div className="fbc">
        <h4 className="h5">{title}</h4>
        <Select
          value={selectedMonth}
          onValueChange={(value) => setSelectedMonth(value)}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month, index) => {
                return (
                  <SelectItem
                    value={month}
                    key={index}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className="h-64 overflow-hidden pointer-events-none"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <Pie data={data} />
      </div>
      <div className="flex  gap-2 flex-col">
        {data.map((data, index) => {
          return (
            <div key={index} className="fbc">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: data.color }}
                ></div>
                <span className="text-sm">{data.x}</span>
              </div>
              <span className="text-sm">{data.y}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const Bids = (props: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  value: number | string;
}) => {
  return (
    <div className="fbc w-full  ">
      <div className="fc gap-2">
        <props.icon width={20} height={20} />
        <span className="text-sm">{props.title}</span>
      </div>
      <span className="text-sm">{props.value}</span>
    </div>
  );
};

export default AdminPage;
