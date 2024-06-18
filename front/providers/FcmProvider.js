"use client";

import { useEffect, useState } from "react";
import MDSnackbar from "/components/MDSnackbar";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MDButton from "/components/MDButton";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "/utils/firebase/index";
import { storeToken } from "/actions/fcm";

export default function FCM({ children }) {
  const [payload, setPayload] = useState(null);
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState("default");
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleAccept = () => {
    if (window !== "undefined") {
      const handler = () => setPermission(Notification.permission);
      handler();

      Notification.requestPermission().then(handler);

      navigator.permissions
        .query({ name: "notifications" })
        .then((notificationPermission) => {
          notificationPermission.onchange = handler;
        });
      setOpen(false);
    }
  };

  const handleReject = () => {
    setPermission("denied");
    setOpen(false);
  };

  useEffect(() => {
    if (permission === "default") {
      setOpen(true);
    }
  }, [permission]);

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

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          "serviceWorker" in navigator &&
          session
        ) {
          const register = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );
          const messaging = getMessaging(firebaseApp);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BN9siHaVjvL_wBx5vx0_zP7BI8mEwwLqOfzAVztlojc9fenuoWkkLc5qNtGy-HXnnglT3HUmILiAvvWQJY5GK-c",
              serviceWorkerRegistration: register,
            });
            storeToken({
              device_token: currentToken,
              staff_id: session.staff.id,
            });
            if (currentToken) {
              setToken(currentToken);
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };
    retrieveToken();
  }, [permission, session]);

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
      <Dialog
        open={open}
        onClose={handleReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 5 }}
      >
        <DialogTitle id="alert-dialog-title">
          ¿Le gustaría recibir notificaciones?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se le notificará si tiene un recordatorio programado
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleAccept} color="success">
            Aceptar
          </MDButton>
          <MDButton onClick={handleReject} color="error">
            Rechazar
          </MDButton>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}
