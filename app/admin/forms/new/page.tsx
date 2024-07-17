"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LabeledInput } from "@/components/atoms/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowUp } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { MdDeleteOutline } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IFieldType, IInputType } from "@/lib/types/ui_types";
import { fields } from "@/components/fields";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { IForm } from "@/lib/types/data_types";
import { useGetDepartments } from "@/lib/hooks/useDepartments";
import { isFilled, useCustomToast } from "@/components/atoms/function";
import { useCreateForm } from "@/lib/hooks/useForm";

export default function Page() {
  const [formFields, setFormFields] = React.useState<IFieldType[]>([]);

  const [formDetails, setFormDetails] = React.useState<IForm>({
    title: "",
    description: "",
    isAnonymous: false,
    department: "",
    published: true,
    status: "active",
    fields: [],
    views: [],
    deadline: undefined,
  });
  useEffect(() => {
    const fields_formatted = formFields.map((field) => {
      return {
        type: field.type,
        title: field.title,
        required: field.required,
        options: field.options || [], // Provide a default empty array for options
        properties: {},
      };
    });

    setFormDetails((prev) => {
      return {
        ...prev,
        fields: fields_formatted,
      };
    });
  }, [formFields]);

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-card p-4 rounded-lg  border space-y-5">
      <FormDetails formDetails={formDetails} setFormDetails={setFormDetails} />
      <Card className=" py-4">
        <CardContent className="flex flex-col gap-5">
          <LabeledInput label="Form Title" id="title">
            <Input
              placeholder="Enter Form Title"
              name="title"
              value={formDetails.title}
              onChange={handleChanges}
            />
          </LabeledInput>
          <LabeledInput label="Form Description" id="description">
            <Textarea
              name="description"
              placeholder="Enter Form Description"
              value={formDetails.description}
              onChange={handleChanges}
            />
          </LabeledInput>
        </CardContent>
      </Card>
      <h3 className="h3">Form Fields</h3>
      {formFields.map((field, index) => {
        return (
          <FormElementWrapper
            element={field}
            key={index}
            formFields={formFields}
            setFormFields={setFormFields}
            index={index}
          />
        );
      })}
      <NewField formFields={formFields} setFormFields={setFormFields} />
    </div>
  );
}
const NewField: React.FC<{
  formFields: IFieldType[];
  setFormFields: React.Dispatch<React.SetStateAction<IFieldType[]>>;
}> = ({ formFields, setFormFields }) => {
  const [field, setField] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Dialog onOpenChange={(isOpen) => setOpen(isOpen)} open={open}>
      <DialogTrigger className="w-full">
        <Button className="w-full">New Field</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
        </DialogHeader>
        <Select onValueChange={(value) => setField(value as string)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Field" />
          </SelectTrigger>
          <SelectContent>
            {fields.map((field, index) => {
              return (
                <SelectItem value={field.type} key={index}>
                  {field.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={() => {
              console.log(field);
              if (field) {
                setFormFields([
                  ...formFields,
                  {
                    type: field as IInputType,
                    title: "",
                    label: fields.find((f) => f.type === field)?.label || "",
                    required: false,
                    id: Math.random().toString(36).substring(7),
                  },
                ]);
              }
            }}
          >
            Add Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
const FormElementWrapper: React.FC<{
  element: IFieldType;
  formFields: IFieldType[];
  setFormFields: React.Dispatch<React.SetStateAction<IFieldType[]>>;
  index: number;
}> = ({ element, formFields, setFormFields, index }) => {
  const Component = fields.find((f) => f.type === element.type)?.component;
  const [field, setField] = React.useState<IFieldType>(element);
  const moveFieldUp = () => {
    if (index > 0) {
      const newFormFields = [...formFields];
      const temp = newFormFields[index - 1];
      newFormFields[index - 1] = newFormFields[index];
      newFormFields[index] = temp;
      setFormFields(newFormFields);
    }
  };
  useEffect(() => {
    setFormFields((prev) => {
      const newFields = [...prev];
      newFields[index] = field;
      return newFields;
    });
  }, [field]);

  return (
    <Card>
      <CardContent className="p-4 space-y-5">
        <div className="flex flex-col gap-5">
          {Component && (
            <Component element={element} field={field} setField={setField} />
          )}
          <Separator />
          <div className="flex justify-between items-center">
            <h4 className="h4 ">{element.label}</h4>
            <div className="flex gap-4">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="flex justify-center shadow-sm"
                onClick={moveFieldUp}
              >
                <FaArrowUp />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="flex justify-center shadow-sm"
                onClick={() => {
                  const fieldToRemove = formFields.filter(
                    (_, i) => i !== index
                  );
                  setFormFields(fieldToRemove);
                }}
              >
                <MdDeleteOutline />
              </Button>
              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  onCheckedChange={(checked) =>
                    setField({
                      ...field,
                      required: checked,
                    })
                  }
                />
                <Label htmlFor="required">Required</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const FormDetails: React.FC<{
  formDetails: IForm;
  setFormDetails: React.Dispatch<React.SetStateAction<IForm>>;
}> = ({ formDetails, setFormDetails }) => {
  const { data: departments } = useGetDepartments();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: createForm } = useCreateForm();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();
  useEffect(() => {
    setFormDetails({
      ...formDetails,
      deadline: date as Date,
    });
  }, [date]);

  const submit = () => {
    if (
      isFilled({
        data: formDetails,
        fields: ["title", "description", "department", "isAnonymous", "status"],
      })
    ) {
      customToast({
        func: async () => {
          await createForm(formDetails);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className="flex justify-end w-full">
        <Button>Publish</Button>
      </DialogTrigger>
      <DialogContent className="space-y-3">
        <DialogHeader className="">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Complete the form details and publish the form.
          </DialogDescription>
        </DialogHeader>
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
        <LabeledInput label="Form Department" id="department">
          <Select
            name="department"
            onValueChange={(value) => {
              setFormDetails({
                ...formDetails,
                department: value as string,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments?.map((department, index) => {
                return (
                  <SelectItem value={department._id} key={index}>
                    {department.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </LabeledInput>
        <LabeledInput label="Anonymous Form" id="isAnonymous">
          <div className="flex w-full">
            <Switch
              id="isAnonymous"
              onCheckedChange={(checked) =>
                setFormDetails({
                  ...formDetails,
                  isAnonymous: checked,
                })
              }
            />
          </div>
        </LabeledInput>

        <DialogFooter>
          <Button onClick={submit}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
