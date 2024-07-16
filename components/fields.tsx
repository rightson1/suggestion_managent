import { IFieldType, IInputType } from "@/lib/types/ui_types";
import { LabeledInput } from "./atoms/ui";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { IFieldFetched } from "@/lib/types/data_types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TextFieldElement: React.FC<{
  element: IFieldType;
  field: IFieldType;
  setField: React.Dispatch<React.SetStateAction<IFieldType>>;
}> = ({ element, field, setField }) => {
  return (
    <>
      <LabeledInput label={element.title || "Field Title"} id="title">
        <Input
          placeholder="Enter Field Title"
          name="title"
          onChange={(e) => {
            setField({
              ...field,
              title: e.target.value,
            });
          }}
        />
      </LabeledInput>
    </>
  );
};
export const TextAreaFieldElement: React.FC<{
  element: IFieldType;
  field: IFieldType;
  setField: React.Dispatch<React.SetStateAction<IFieldType>>;
}> = ({ element, field, setField }) => {
  return (
    <LabeledInput label={element.title || "Field Title"} id="title">
      <Textarea
        placeholder="Enter Field Title"
        name="title"
        className="min-h-[100px]"
        onChange={(e) => {
          setField({
            ...field,
            title: e.target.value,
          });
        }}
      />
    </LabeledInput>
  );
};
export const DropdownFieldElement: React.FC<{
  element: IFieldType;
  field: IFieldType;
  setField: React.Dispatch<React.SetStateAction<IFieldType>>;
}> = ({ element, field, setField }) => {
  const addOption = () => {
    setField({
      ...field,
      options: [...(field.options || []), ""],
    });
  };

  const updateOption = (value: string, index: number) => {
    const updatedOptions = field.options ? [...field.options] : [];
    updatedOptions[index] = value;
    setField({
      ...field,
      options: updatedOptions,
    });
  };

  const removeOption = (index: number) => {
    const updatedOptions = field.options
      ? field.options.filter((_, i) => i !== index)
      : [];
    setField({
      ...field,
      options: updatedOptions,
    });
  };

  return (
    <div className="space-y-5">
      <LabeledInput label={element.title || "Dropdown Title"} id="title">
        <Input
          placeholder="Enter Dropdown Title"
          value={field.title}
          onChange={(e) => {
            setField({
              ...field,
              title: e.target.value,
            });
          }}
        />
      </LabeledInput>
      <div className="space-y-2">
        {field.options?.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(e.target.value, index)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addOption}>Add Option</Button>
    </div>
  );
};

export const fields: {
  type: IInputType;
  component: React.ElementType;
  label: string;
}[] = [
  {
    type: "text",
    component: TextFieldElement,
    label: "Text Field",
  },
  {
    type: "textarea",
    component: TextAreaFieldElement,
    label: "Text Area Field",
  },

  {
    type: "dropdown",
    component: DropdownFieldElement,
    label: "Dropdown Field",
  },
];
const TextInput: React.FC<{ field: IFieldFetched }> = ({ field }) => {
  return (
    <Input
      name={field._id}
      placeholder={field.title}
      required={field.required}
    />
  );
};

const TextAreaInput: React.FC<{ field: IFieldFetched }> = ({ field }) => {
  return (
    <Textarea
      required={field.required}
      name={field._id}
      className="min-h-[100px]"
    />
  );
};
const DropdownInput: React.FC<{ field: IFieldFetched }> = ({ field }) => {
  return (
    <Select name={field._id} required={field.required}>
      <SelectTrigger>
        <SelectValue placeholder={field.title} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export const input_fields: {
  type: IInputType;
  component: React.ElementType;
}[] = [
  {
    type: "text",
    component: TextInput,
  },
  {
    type: "textarea",
    component: TextAreaInput,
  },
  {
    type: "dropdown",
    component: DropdownInput,
  },
];
