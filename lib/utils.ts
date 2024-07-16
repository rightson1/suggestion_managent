import { AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const eCheck = (res: AxiosResponse<any, any>) => {
  const data = res?.data;
  if (data && data.success === false) {
    throw new Error(data.message);
  }
  return data;
};
