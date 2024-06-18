"use client";

import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "/utils/firebase/index";
import useFcm from "/hooks/useFcm";
import MDSnackbar from "/components/MDSnackbar";
import { useSession } from "next-auth/react";

export default function FCM({ children }) {
  const [payload, setPayload] = useState(null);
  const { data: session } = useSession();
  const { token, permission } = useFcm({ session });

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        if (session.staff.id == payload.data.staffId) {
          setPayload(payload);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [token, permission, session]);

  return (
    <>
      {payload && (
        <MDSnackbar
          color="error"
          icon="warning"
          title={payload.notification.title}
          content={payload.notification.body}
          open={payload}
          onClose={() => setPayload(null)}
          close={() => setPayload(null)}
          bgWhite
        />
      )}
      {children}
    </>
  );
}
