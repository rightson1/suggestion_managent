"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LabeledInput } from "../atoms/ui";
import { Textarea } from "../ui/textarea";
import { IoIosSchool } from "react-icons/io";
import { useState } from "react";
import { isFilled, useCustomToast } from "../atoms/function";
import { addNotification } from "@/lib/hooks/useNotifications";
export function CreateNotification({
  sender,
  receiver,
  modalTitle,
  triggerBtn,
  title,
}: {
  sender: string;
  receiver: string;
  modalTitle: string;
  triggerBtn: React.ReactNode;
  title: string;
}) {
  const { loading, customToast } = useCustomToast();
  const [description, setDescription] = useState("");

  const submit = async () => {
    customToast({
      func: async () => {
        await addNotification({
          title,
          description: description,
          link: "/forms",
          sender,
          receiver,
        });
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 items-center gap-4">
          <LabeledInput id="description" label="Description">
            <Textarea
              id="description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </LabeledInput>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit} disabled={loading}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
