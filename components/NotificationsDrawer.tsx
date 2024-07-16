"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { use, useEffect, useState } from "react";
import { Bell, User, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { INotification, INotificationFetched } from "@/lib/types/data_types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "./providers/AuthProvider";
import { db } from "@/lib/firebase";

export const NotificationsDrawer = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotificationFetched[]>(
    []
  );
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      where("receiver", "==", user._id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as INotificationFetched)
      );
      setNotifications(updatedNotifications);
    });
    return () => unsubscribe();
  }, [user]);
  console.log(notifications);
  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell height={20} width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        closeBtn={false}
        className="w-[300px] bg-card  overflow-y-auto"
        overlay={false}
      >
        <SheetHeader>
          <div className="fbc">
            <SheetTitle>Notifications?</SheetTitle>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <X size={20} />
            </Button>
          </div>
        </SheetHeader>
        <div className="fx-c mt-5 space-y-3">
          <span className="p text-sm">Today</span>
        </div>
        <div className="fx-c mt-5 space-y-3">
          {notifications.map((notification) => (
            <NotificationsCard
              key={notification.id}
              icon={User}
              action={notification.title}
              time={notification.description}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface IProps {
  icon: any;
  action: string;
  time: string;
}
const NotificationsCard = (props: IProps) => {
  return (
    <Card>
      <CardContent className="p-2 flex gap-3">
        <div className="rounded-full gap-5 bg-primary/10 min-w-10 text-primary h-10 w-10 fc">
          <props.icon />
        </div>
        <div className="flex flex-grow flex-col ">
          <span className="text-sm text-wrap">{props.action}</span>
          <span className="text-xs text-grayish">{props.time}</span>
        </div>
      </CardContent>
    </Card>
  );
};
