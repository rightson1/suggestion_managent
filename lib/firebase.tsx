import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const configFromEnv = (() => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
})();
const firebaseConfig = {
  apiKey: configFromEnv.apiKey,
  authDomain: configFromEnv.authDomain,
  projectId: configFromEnv.projectId,
  storageBucket: configFromEnv.storageBucket,
  messagingSenderId: configFromEnv.messagingSenderId,
  appId: configFromEnv.appId,
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
