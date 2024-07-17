import { fields } from "@/components/fields";
import { IInputType } from "./ui_types";
export interface IUserBasic {
  displayName: string;
  email: string;
  uid: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  departments: string[];
}
export interface IUserIdentity {
  uid: string;
  email: string;
}
export interface Fetched {
  _id: string;
  created: string;
  updated: string;
}
export interface IUser extends IUserBasic, Fetched {}
export interface IDepartmentBasic {
  title: string;
  description: string;
}

export interface IDepartment extends IDepartmentBasic, Fetched {
  numberOfStudents: number;
  numberOfForms: number;
}

export interface IField {
  type: IInputType;
  title: string;
  required: boolean;
  options: string[];
  properties: Record<string, unknown>;
}
export interface IFieldFetched extends IField, Fetched {}

export interface IForm {
  title: string;
  description: string;
  isAnonymous: boolean;
  department?: string; // assuming department's ObjectId will be represented as string
  published: boolean;
  views: string[]; // assuming views' ObjectId will be represented as string
  status: "active" | "inactive";
  fields: IField[] | IFieldFetched[];
  deadline?: Date;
}

export interface IFormFetched extends IForm, Fetched {
  responseCount: number;
  fields: IFieldFetched[];
}
export interface IFormUser extends IForm, Fetched {
  hasUserFilled: boolean;
}

export interface IResponseField {
  field: string; // assuming field's ObjectId will be represented as string
  answer: string;
}

export interface IResponse {
  form: string;
  user: string;
  responses: IResponseField[];
}
export interface IResponseFetched extends Fetched {
  user: IUser;
  responses: {
    field: string;
    answer: string;
    _id: string;
    fieldDetails: IFieldFetched;
  }[];
}
export interface INotification {
  title: string;
  description: string;
  link: string;
  sender: string;
  receiver: string;
}

export interface INotificationFetched extends INotification {
  id: string;
}
