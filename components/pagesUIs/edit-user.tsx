"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { IUser } from "@/lib/types/data_types";
import { useGetDepartments } from "@/lib/hooks/useDepartments";
import { useEffect, useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../shared/Multiselect";
import { useUpdateUser } from "@/lib/hooks/useUsers";
import { useCustomToast } from "../atoms/function";

export const EditUser = ({ user }: { user: IUser }) => {
  const { data: departments } = useGetDepartments();
  const [value, setValue] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useUpdateUser();
  const { customToast, loading } = useCustomToast();
  useEffect(() => {
    if (departments) {
      setValue(
        user.departments
          ?.map((dep) => {
            return departments.find((d) => d._id === dep)?.title;
          })
          .filter((dep) => dep !== undefined) as string[]
      );
    }
  }, [departments]);
  const submit = async () => {
    const data = {
      _id: user._id,
      departments: value
        .map((title) => {
          return departments?.find((dep) => dep.title === title)?._id;
        })
        .filter((dep) => dep !== undefined),
    };
    customToast({
      func: async () => {
        await mutateAsync(data);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <Pen size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        {departments && (
          <MultiSelector values={value} onValuesChange={setValue} loop={false}>
            <MultiSelectorTrigger>
              <MultiSelectorInput
                className=""
                placeholder="Select Department"
              />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {departments.map((option, i) => (
                  <MultiSelectorItem key={i} value={option.title}>
                    {option.title}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        )}
        <DialogFooter>
          <Button disabled={loading} onClick={submit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
