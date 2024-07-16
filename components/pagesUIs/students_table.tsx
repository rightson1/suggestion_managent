"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../data/table_wrapper";
import { Button } from "../ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { IDepartment } from "@/lib/types/data_types";
import { useGetDepartments } from "@/lib/hooks/useDepartments";
import { EditDepartment } from "./add_department";
export const UsersDepartments = () => {
  const { data: departments, isPending } = useGetDepartments();
  const columns: ColumnDef<IDepartment>[] = [
    {
      accessorKey: "title",
      header: "Department Name",
    },
    {
      accessorKey: "numberOfStudents",
      header: "Number of Students",
    },
    {
      accessorKey: "numberOfForms",
      header: "Number of Forms",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ cell }) => {
        return (
          <div className="flex gap-2">
            {/* <Button variant={"ghost"} size="icon">
              <AiOutlineEye size={20} />
            </Button> */}
            <EditDepartment department={cell.row.original} />
            <Button variant={"ghost"} size="icon">
              <MdDeleteOutline size={20} />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table_Wrapper
        columns={columns}
        data={departments || []}
        loading={isPending}
        columnVisibilitySelector={false}
        hideToolbar={true}
      />
    </div>
  );
};
