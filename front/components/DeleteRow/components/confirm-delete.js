"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

export default function ConfirmDelete({
  setConfirmed,
  setOpenDeleteConfirmation,
}) {
  return (
    <MDBox p={2}>
      <MDTypography variant="h4" mb={5}>
        ¿Está seguro que desea eliminar este elemento?
      </MDTypography>
      <MDBox display="flex" justifyContent="end">
        <MDButton
          variant="gradient"
          color="error"
          onClick={() => {
            setConfirmed(true);
            setOpenDeleteConfirmation(false);
          }}
        >
          Eliminar
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
