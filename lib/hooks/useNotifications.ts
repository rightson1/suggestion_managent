import { collection, addDoc } from "firebase/firestore";
import { INotification } from "../types/data_types";
import { db } from "../firebase";

export const addNotification = async (notification: INotification) => {
  return await addDoc(collection(db, "notifications"), notification);
};
