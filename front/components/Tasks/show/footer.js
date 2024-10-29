"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { useDataProvider } from "/providers/DataProvider";

export default function Footer({ saveTask }) {
  const { task, closeShowModal, isSaving } = useDataProvider();

  return (
    <MDBox position="sticky" bottom="0px" width="100%">
      <MDBox display="flex" justifyContent="space-between" py={2} px={5}>
        <MDButton
          variant="gradient"
          color="light"
          type="button"
          sx={{ maxHeight: "50px" }}
          onClick={closeShowModal}
        >
          Cancelar
        </MDButton>
        {!task.isBlocked && (
          <MDButton
            variant="gradient"
            color="info"
            type="button"
            sx={{ maxHeight: "50px" }}
            disabled={isSaving}
            onClick={saveTask}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </MDButton>
        )}
      </MDBox>
    </MDBox>
  );
}
