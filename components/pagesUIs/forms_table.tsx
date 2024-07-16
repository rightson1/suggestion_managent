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
      id: "View Responses",
      header: "View Responses",
      cell: ({ row }) => {
        return (
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              console.log("View Responses");
            }}
          >
            <Link href={`/admin/forms/responses/${row.original._id}`}>
              View
            </Link>
          </Button>
        );
      },
    },
    {
      id: "Actions",
      header: "Actions",
      cell: (row) => {
        return (
          <div>
            <Button
              size="icon"
              variant={"ghost"}
              className="mr-2"
              onClick={() => {
                console.log("Edit");
              }}
            >
              <MdEdit size={20} />
            </Button>
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
