import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../data/table_wrapper";
import { useGetForms } from "@/lib/hooks/useForm";
import { IFormFetched } from "@/lib/types/data_types";

export const HomePageTable = () => {
  const { data: forms } = useGetForms();
  const columns: ColumnDef<IFormFetched>[] = [
    {
      accessorKey: "title",
      header: "Form Name",
    },
    {
      accessorKey: "responseCount",
      header: "Form Fills",
    },
    {
      id: "Actions",
    },
  ];
  return (
    <Tabs defaultValue="rejection" className="w-full">
      <div className="flex justify-between">
        <h4 className="h4">Recent Forms</h4>
      </div>
      <Table_Wrapper
        columns={columns}
        data={forms || []}
        columnVisibilitySelector={false}
        hideToolbar={true}
      />
    </Tabs>
  );
};
