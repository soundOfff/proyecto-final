"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import Modal from "/components/Modal";

export default function CancelModal({
  setOpenConfirmation,
  openConfirmation,
  returnToSource,
}) {
  return (
    <Modal
      width="max-content"
      height="min-content"
      border="0px solid transparent"
      open={openConfirmation}
      onClose={() => {
        setOpenConfirmation(false);
      }}
    >
      <MDBox p={2}>
        <MDTypography variant="h4" mb={5}>
          ¿Está seguro que desea cancelar esta acción?
        </MDTypography>
        <MDBox display="flex" justifyContent="end">
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => {
              setOpenConfirmation(false);
              returnToSource();
            }}
          >
            Confirmar
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}
