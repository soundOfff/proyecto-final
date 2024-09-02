import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LoopIcon from "@mui/icons-material/Loop";
import CheckIcon from "@mui/icons-material/Check";

export default function CopyButton({ url }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);

  const handleCopy = async () => {
    if (isCopyLoading) return;

    setIsCopyLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    } finally {
      setIsCopyLoading(false);
    }
  };

  return (
    <Tooltip title="Copiar URL">
      {isCopied ? (
        <CheckIcon
          color="info"
          fontSize="medium"
          sx={{ mx: 1, cursor: "pointer" }}
        />
      ) : isCopyLoading ? (
        <LoopIcon
          color="text"
          fontSize="medium"
          sx={{
            animation: "spin 2s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(360deg)",
              },
              "100%": {
                transform: "rotate(0deg)",
              },
            },
          }}
        />
      ) : (
        <ContentCopyIcon
          color="info"
          fontSize="medium"
          onClick={handleCopy}
          sx={{ mx: 1, cursor: "pointer" }}
        />
      )}
    </Tooltip>
  );
}
