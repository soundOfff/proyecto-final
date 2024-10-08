import { useEffect, useState } from "react";

export default function useSlackLogged({ session }) {
  const [isSlackLogged, setIsSlackLogged] = useState(true);

  useEffect(() => {
    if (session && !session.staff.slackChannel) {
      setIsSlackLogged(false);
    }
  }, [session]);

  return { isSlackLogged, setIsSlackLogged };
}
