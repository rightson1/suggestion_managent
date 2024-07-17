import { IFormFetched } from "@/lib/types/data_types";
import React, { useEffect, useState } from "react";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const EditForm: React.FC<{
  form: IFormFetched;
}> = ({ form }) => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync } = useUpdateForm();
  const [date, setDate] = useState<Date | undefined>(form.deadline);
  const [values, setValues] = React.useState<Partial<IFormFetched>>({
    status: form.status,
    published: form.published,
    _id: form._id,
    deadline: form.deadline,
  });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  useEffect(() => {
    setValues({
      ...values,
      deadline: date,
    });
  }, [date]);
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
            <SelectTrigger className="w-full">
              <SelectValue className="capitalize w-full ">
                {values.status}
              </SelectValue>
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
        <LabeledInput label="Deadline" id="">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </LabeledInput>
        <DialogFooter>
          <Button onClick={submit}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
