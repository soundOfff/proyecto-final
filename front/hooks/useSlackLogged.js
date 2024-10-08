import { useEffect, useState } from "react";
import { show } from "/actions/staffs";

export default function useSlackLogged({ session }) {
  const [isSlackLogged, setIsSlackLogged] = useState(true);

  useEffect(() => {
    if (session && session.staff) {
      show(session.staff.id).then((staff) => {
        if (staff.slackChannel) {
          setIsSlackLogged(true);
        } else {
          setIsSlackLogged(false);
        }
      });
    }
  }, [session]);

  return { isSlackLogged, setIsSlackLogged };
}
