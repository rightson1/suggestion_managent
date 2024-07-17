import { IFormFetched } from "@/lib/types/data_types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomToast } from "../atoms/function";
import { Button } from "../ui/button";
import { MdEdit } from "react-icons/md";
import { useUpdateForm } from "@/lib/hooks/useForm";
import { LabeledInput } from "../atoms/ui";

export const EditForm: React.FC<{
  form: IFormFetched;
}> = ({ form }) => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync } = useUpdateForm();
  const [values, setValues] = React.useState<Partial<IFormFetched>>({
    status: form.status,
    published: form.published,
    _id: form._id,
  });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const submit = () => {
    customToast({
      func: async () => {
        await mutateAsync(values);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className="flex justify-end ">
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
      </DialogTrigger>
      <DialogContent className="space-y-3">
        <DialogHeader className="">
          <DialogTitle>{form.title}</DialogTitle>
          <DialogDescription>Edit Form Details</DialogDescription>
        </DialogHeader>
        <LabeledInput label="Status" id="status">
          <Select
            value={values.status}
            onValueChange={(value) => {
              setValues({ ...values, status: value as "active" | "inactive" });
            }}
          >
            <SelectTrigger>
              <SelectValue className="capitalize">{values.status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="capitalize" value="active">
                Active
              </SelectItem>
              <SelectItem className="capitalize" value="inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </LabeledInput>
        <LabeledInput label="Published/Draft" id="published">
          <Select
            onValueChange={(value) => {
              setValues({
                ...values,
                published: value == "true" ? true : false,
              });
            }}
            value={values.published ? "true" : "false"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">False</SelectItem>
              <SelectItem value="true">True</SelectItem>
            </SelectContent>
          </Select>
        </LabeledInput>
        <DialogFooter>
          <Button onClick={submit}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
