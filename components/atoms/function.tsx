"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);

    return toast.promise(
      func()
        .then((res) => {
          const data = res?.data;
          if (data && data.success === false) {
            throw new Error(data.message);
          }
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          setLoading(false);
          if (efunc) efunc();
          throw e;
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
          let detail = e?.response?.data?.detail;
          return detail || e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};
export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

export const isFilled = <TDATA,>({
  data,
  fields,
}: {
  data: TDATA;
  fields: (keyof TDATA)[];
}) => {
  let empty_fields: string[] = [];
  const completed = fields.every((field) => {
    const data_field = data[field] !== "";

    if (!data_field) {
      empty_fields.push(field as string);
    }
    return data_field;
  });

  if (empty_fields.length > 0) {
    toast.error(`Please fill in the ${empty_fields.join(", ")}`);
  }
  return completed;
};
