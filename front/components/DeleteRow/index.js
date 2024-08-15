"use client";

import Modal from "/components/Modal";
import ConfirmDelete from "./components/confirm-delete";
import MDSnackbar from "/components/MDSnackbar";

export default function DeleteRow({
  setOpenDeleteConfirmation,
  errorSB,
  setErrorSB,
  errorMsg,
  openDeleteConfirmation,
  setDeleteConfirmed,
}) {
  return (
    <>
      <Modal
        width="max-content"
        height="min-content"
        border="0px solid transparent"
        open={openDeleteConfirmation}
        onClose={() => {
          setOpenDeleteConfirmation(false);
        }}
      >
        <ConfirmDelete
          setConfirmed={setDeleteConfirmed}
          setOpenDeleteConfirmation={setOpenDeleteConfirmation}
        />
      </Modal>
      <MDSnackbar
        color="error"
        icon="warning"
        title={errorMsg.title}
        content={errorMsg.content}
        open={errorSB}
        onClose={() => setErrorSB(false)}
        close={() => setErrorSB(false)}
        bgWhite
      />
    </>
  );
}
