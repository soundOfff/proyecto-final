import { useState } from "react";

export default function useSlackShare() {
  const [openSlackShareModal, setOpenSlackShareModal] = useState(false);

  return {
    openSlackShareModal,
    setOpenSlackShareModal,
  };
}
