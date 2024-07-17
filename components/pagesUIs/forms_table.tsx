"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../data/table_wrapper";
import { recent_forms, TRecentForms } from "@/lib/data/table_data";
import { Button } from "../ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetForms } from "@/lib/hooks/useForm";
import { IFormFetched } from "@/lib/types/data_types";
import Link from "next/link";
import { EditForm } from "./edit_form";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
export const FormsTable = () => {
  const { data: forms, isPending } = useGetForms();
  const columns: ColumnDef<IFormFetched>[] = [
    {
      accessorKey: "title",
      header: "Form Name",
    },
    {
      accessorKey: "responseCounts",
      header: "Form Fills",
      accessorFn: (row) => {
        console.log(row);
        return row.responseCount;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original.status;
        return (
          <Badge
            variant={"outline"}
            className={cn(
              value === "active"
                ? "border-primary text-primary"
                : "border-destructive text-destructive"
            )}
          >
            {value}
          </Badge>
        );
      },
    },
    {
      accessorKey: "published",
      header: "Published",
      cell: ({ row }) => {
        const value = row.original.published;
        return (
          <Badge
            variant={"outline"}
            className={cn(
              value
                ? "border-primary text-primary"
                : "border-destructive text-destructive"
            )}
          >
            {value ? "Published" : "Not Published"}
          </Badge>
        );
      },
    },
    {
      id: "View Responses",
      header: "View Responses",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/forms/responses/${row.original._id}`}>View</Link>
        );
      },
      size: 100,
    },
    {
      id: "Actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            <EditForm form={row.original} />
            <Button
              size="icon"
              variant={"ghost"}
              onClick={() => {
                console.log("Delete");
              }}
            >
              <MdDelete size={20} />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full">
      <Table_Wrapper
        columns={columns}
        data={forms || []}
        loading={isPending}
        columnVisibilitySelector={false}
        hideToolbar={true}
      />
    </div>
  );
};
