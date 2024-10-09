"use client";

import SlackButton from "/components/SlackButton";
import SlackShareModal from "/components/ModalContent/SlackShare";
import MDBox from "/components/MDBox";
import { useState } from "react";

export default function SlackShare({
  modelId,
  modelType,
  boxProps,
  buttonProps,
}) {
  const [openSlackShareModal, setOpenSlackShareModal] = useState();

  return (
    <MDBox {...boxProps}>
      <SlackButton
        onClick={() => {
          setOpenSlackShareModal(true);
        }}
        {...buttonProps}
      />
      <SlackShareModal
        open={openSlackShareModal}
        onClose={() => {
          setOpenSlackShareModal(false);
        }}
        modelId={modelId}
        modelType={modelType}
      />
    </MDBox>
  );
}
