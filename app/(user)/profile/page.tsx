"use client";
import { useCustomToast } from "@/components/atoms/function";
import { LabeledInput } from "@/components/atoms/ui";
import { useAuth } from "@/components/providers/AuthProvider";
import { BarButton, PageTitle } from "@/components/shared/PageTopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/lib/hooks/useUsers";
import { IUser } from "@/lib/types/data_types";
import { ClipboardPlus } from "lucide-react";
import React, { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();
  const { customToast } = useCustomToast();
  const { mutateAsync: updatedUser } = useUpdateUser();
  const [values, setValues] = React.useState<Partial<IUser>>({
    displayName: "",
    email: "",
  });
  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);
  const submit = async () => {
    customToast({
      func: async () => {
        await updatedUser({
          _id: values._id,
          displayName: values.displayName,
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 h-min">
      <div className="fb">
        <PageTitle title="Profile" link="/profile" />
        <BarButton icon={ClipboardPlus} text="Export" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <LabeledInput label="Names" id="displayName">
          <Input
            name="displayName"
            value={values?.displayName}
            onChange={(e) =>
              setValues({
                ...values,
                displayName: e.target.value as string,
              })
            }
          />
        </LabeledInput>
        <LabeledInput label="Email" id="email">
          <Input
            name="email"
            value={values?.email}
            readOnly
            onChange={(e) =>
              setValues({
                ...values,
                email: e.target.value as string,
              })
            }
          />
        </LabeledInput>
      </div>
      <div className="flex justify-end">
        <Button onClick={submit}>Save</Button>
      </div>
    </div>
  );
}
