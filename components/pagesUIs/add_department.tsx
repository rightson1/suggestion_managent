"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LabeledInput } from "../atoms/ui";
import { Textarea } from "../ui/textarea";
import { IoIosSchool } from "react-icons/io";
import { useState } from "react";
import { isFilled, useCustomToast } from "../atoms/function";
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "@/lib/hooks/useDepartments";
import toast from "react-hot-toast";
import { IDepartment } from "@/lib/types/data_types";
import { CiEdit } from "react-icons/ci";
export function AddDepartment() {
  const { loading, customToast } = useCustomToast();
  const { mutateAsync: createDep } = useCreateDepartment();
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };
  const submit = async () => {
    const completed = isFilled({
      data: values,
      fields: ["title", "description"],
    });
    if (!completed) {
      return;
    }
    customToast({
      func: () => createDep(values),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fic gap-2">
          <IoIosSchool size={17} />
          <span>Add Department</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 items-center gap-4">
          <LabeledInput id="name" label="Name">
            <Input
              id="title"
              className="w-full"
              value={values.title}
              onChange={handleChange}
            />
          </LabeledInput>

          <LabeledInput id="description" label="Description">
            <Textarea
              id="description"
              className="w-full"
              value={values.description}
              onChange={handleChange}
            />
          </LabeledInput>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit} disabled={loading}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function EditDepartment({ department }: { department: IDepartment }) {
  const { loading, customToast } = useCustomToast();
  const { mutateAsync: updateDep } = useUpdateDepartment();
  const [values, setValues] = useState({
    title: department.title,
    description: department.description,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };
  const submit = async () => {
    const completed = isFilled({
      data: values,
      fields: ["title", "description"],
    });
    if (!completed) {
      return;
    }
    customToast({
      func: () =>
        updateDep({
          ...department,
          ...values,
        }),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <CiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 items-center gap-4">
          <LabeledInput id="name" label="Name">
            <Input
              id="title"
              className="w-full"
              value={values.title}
              onChange={handleChange}
            />
          </LabeledInput>

          <LabeledInput id="description" label="Description">
            <Textarea
              id="description"
              className="w-full"
              value={values.description}
              onChange={handleChange}
            />
          </LabeledInput>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit} disabled={loading}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
