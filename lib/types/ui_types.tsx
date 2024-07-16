export type IInputType = "text" | "textarea" | "dropdown";
export interface IFieldType {
  type: IInputType;
  title: string;
  label: string;
  required: boolean;
  options?: string[];
  id: string;
}
