"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../data/table_wrapper";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { IUser } from "@/lib/types/data_types";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { EditUser } from "./edit-user";

export const UsersTable = () => {
  const { data: users, isPending } = useGetUsers();
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "displayName",
      header: "Full Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "departments",
      header: "departments",
      accessorFn: ({ departments }) => {
        console.log({ departments });
        return departments?.length || 0;
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ cell, row }) => {
        return (
          <div className="flex gap-2">
            <EditUser user={row.original} />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table_Wrapper
        columns={columns}
        data={users || []}
        loading={isPending}
        columnVisibilitySelector={false}
        hideToolbar={true}
      />
    </div>
  );
};
