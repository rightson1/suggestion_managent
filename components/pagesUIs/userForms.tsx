"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../data/table_wrapper";
import { Button } from "../ui/button";
import { useGetUserForms } from "@/lib/hooks/useForm";
import { IFormUser } from "@/lib/types/data_types";
import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";
export const UserForms = () => {
  const { user } = useAuth();
  const { data: forms, isPending } = useGetUserForms(user?._id);
  const columns: ColumnDef<IFormUser>[] = [
    {
      accessorKey: "title",
      header: "Form Name",
    },
    {
      accessorKey: "isAnonymous",
      header: "Anonymous",
      accessorFn: (row) => (row.isAnonymous ? "Yes" : "No"),
    },
    {
      accessorKey: "hasUserFilled",
      header: "Filled",
      accessorFn: (row) => (row.hasUserFilled ? "Yes" : "No"),
    },
    {
      id: "Response",
      header: " Response",
      cell: ({ row }) => {
        return row.original.hasUserFilled ? (
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              console.log("View Responses");
            }}
          >
            View Response
          </Button>
        ) : (
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              console.log("View Responses");
            }}
          >
            <Link href={`/forms/${row.original._id}`}>Fill Form</Link>
          </Button>
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
