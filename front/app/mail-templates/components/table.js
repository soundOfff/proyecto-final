"use client";

import { useRouter } from "next/navigation";
import Row from "./row";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import { Link } from "@mui/material";
import { disableGroup } from "/actions/mail-templates";

const renderGroup = ({ name, mailTemplates, id, index }) => {
  const handleUpdateState = (id, disabled) => {
    disableGroup(id, {
      disabled,
    });
  };

  return (
    <MDBox key={index}>
      <MDBox
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="grey-100"
        sx={{ border: "1px solid #e0e0e0" }}
        p={1}
      >
        <MDBox display="flex" gap={2} pl={8} flexDirection="column">
          <MDTypography variant="body4" color="text" fontWeight="bold">
            {name}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" gap={2} pr={8}>
          <MDButton
            color="dark"
            variant="text"
            onClick={() => handleUpdateState(id, 0)}
          >
            Habilitar todos
          </MDButton>
          <MDButton
            color="primary"
            variant="text"
            onClick={() => handleUpdateState(id, 1)}
          >
            Desabilitar todos
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        px={8}
        m={3}
        gap={2}
        sx={{ listStyle: "none" }}
      >
        {mailTemplates.length === 0 ? (
          <MDTypography variant="caption" color="dark" fontWeight="regular">
            No hay plantillas de mail para este grupo
          </MDTypography>
        ) : (
          mailTemplates
            .filter((template) => template.lang.code == "en")
            .map((template) => {
              return (
                <Row
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  slug={template.event}
                  disabled={template.disabled}
                />
              );
            })
        )}
      </MDBox>
    </MDBox>
  );
};

export default function Table({ groups }) {
  const router = useRouter();

  return (
    <>
      <MDBox
        pt={3}
        px={6}
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <MDTypography variant="h4" fontWeight="medium">
          Plantillas de email
        </MDTypography>
        <MDButton
          type="button"
          variant="gradient"
          color="dark"
          onClick={() => router.push("/mail-templates/create")}
        >
          Crear plantillas de mails
        </MDButton>
      </MDBox>
      <MDBox pt={3} pb={2}>
        {groups.map(renderGroup)}
      </MDBox>
    </>
  );
}
