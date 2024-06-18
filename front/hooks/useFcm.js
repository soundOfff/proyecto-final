import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "/utils/firebase/index";
import { storeToken } from "/actions/fcm";

const useFcm = ({ session }) => {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (window !== "undefined") {
      const handler = () => setPermission(Notification.permission);
      handler();

      Notification.requestPermission().then(handler);

      navigator.permissions
        .query({ name: "notifications" })
        .then((notificationPermission) => {
          notificationPermission.onchange = handler;
        });
    }
  }, []);

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
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();

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

  return { token, permission };
};

export default useFcm;
