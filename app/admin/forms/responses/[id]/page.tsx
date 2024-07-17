"use client";
import { Loading } from "@/components/loading";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { IoChatboxOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetForm, useGetResponsesAdmin } from "@/lib/hooks/useForm";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { CreateNotification } from "@/components/pagesUIs/send_notification";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data: responses, isPending: repsonsesLoading } = useGetResponsesAdmin(
    {
      form_id: params.id,
    }
  );
  const { data: form, isPending: formLoading } = useGetForm(params.id);
  if (formLoading || repsonsesLoading) {
    return <Loading />;
  }
  if (responses && form) {
    return (
      <div className="">
        <h1 className="h3">{form.title}</h1>
        <p>{form.description}</p>
        <div className="flex flex-col gap-5 my-5">
          {responses.map((response) => {
            return (
              <Card key={response._id}>
                <CardContent className="p-4 space-y-5">
                  <div className="flex flex-col gap-5">
                    {response.responses.map((response) => {
                      return (
                        <div key={response._id} className="flex flex-col gap-2">
                          <h3 className="h6">{response.fieldDetails.title}</h3>

                          <p>{response.answer}</p>
                        </div>
                      );
                    })}
                    <Separator />
                    <div className="flex justify-between items-center">
                      {form.isAnonymous ? (
                        <div />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Response by:</span>
                          <span>{response.user.displayName}</span>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <CreateNotification
                          triggerBtn={
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="flex justify-center shadow-sm"
                            >
                              <IoChatboxOutline size={20} />
                            </Button>
                          }
                          title={`Feedback from you suggestion form: ${form.title}
                            `}
                          modalTitle="Send Feedback"
                          sender={response.user._id}
                          receiver={response.user._id}
                        />
                        <div className="flex items-center space-x-2">
                          <Switch id="required" checked={form.isAnonymous} />
                          <Label htmlFor="required">Anonimous</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Page;
