"use client";
import { useCustomToast } from "@/components/atoms/function";
import { LabeledInput } from "@/components/atoms/ui";
import { input_fields } from "@/components/fields";
import { Loading } from "@/components/loading";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useCreateResponse, useGetForm } from "@/lib/hooks/useForm";
import { IResponseField } from "@/lib/types/data_types";
import React from "react";

export default function Page({
  params,
}: {
  params: {
    form: string;
  };
}) {
  const { data: form, isPending } = useGetForm(params.form);
  const { user } = useAuth();
  const { mutateAsync: createForm } = useCreateResponse();
  const { customToast, loading } = useCustomToast();
  if (isPending) {
    return <Loading />;
  }
  if (!form) {
    return <div>Form not found</div>;
  }
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      return;
    }
    e.preventDefault();
    //get all the form data
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {}; // Add type annotation for data object
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const fields: IResponseField[] = form.fields.map((field) => {
      return {
        field: field._id,
        answer: data[field._id],
      };
    });

    customToast({
      func: async () => {
        await createForm({
          form: form._id,
          user: user._id,
          responses: fields,
        });
      },
    });
  };
  return (
    <div>
      <h1 className="h3">{form.title}</h1>
      <p>{form.description}</p>
      <form onSubmit={submit} className="flex flex-col gap-5 mt-5">
        {form.fields.map((field) => {
          const FieldComponent = input_fields.find(
            (item) => item.type === field.type
          )?.component;
          return (
            <LabeledInput key={field._id} label={field.title} id={field._id}>
              {FieldComponent ? (
                <FieldComponent field={field} />
              ) : (
                <div>Field not found</div>
              )}
            </LabeledInput>
          );
        })}
        <div className="w-full flex justify-end">
          <Button disabled={loading}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
