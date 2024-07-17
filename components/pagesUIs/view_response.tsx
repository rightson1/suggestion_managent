"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "../providers/AuthProvider";
import { useGetUserForms } from "@/lib/hooks/useForm";
import { Button } from "../ui/button";
import {
  IFormFetched,
  IFormUser,
  IResponseFetched,
} from "@/lib/types/data_types";
import { IoChatboxOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetForm, useGetResponsesAdmin } from "@/lib/hooks/useForm";
import { Switch } from "@/components/ui/switch";
export const View_response = ({ form }: { form: IFormUser }) => {
  const [response, setResponse] = React.useState<IResponseFetched>();
  const { user } = useAuth();
  const { data: responses, isPending } = useGetResponsesAdmin({
    form_id: form._id,
    user_id: user?._id,
  });

  useEffect(() => {
    if (responses) {
      setResponse(responses[0]);
    }
  }, [responses]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="sm"
          variant="link"
          onClick={() => {
            console.log("View Responses");
          }}
        >
          View Response
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.title}</DialogTitle>
        </DialogHeader>
        {response && (
          <Card>
            <CardContent className="p-4 space-y-5">
              <div className="flex flex-col gap-5">
                {response.responses.map((response) => {
                  return (
                    <div className="flex flex-col gap-2" key={response._id}>
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
                    <div className="flex items-center space-x-2">
                      <Switch id="required" checked={form.isAnonymous} />
                      <Label htmlFor="required">Anonimous</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};
