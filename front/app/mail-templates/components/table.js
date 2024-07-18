"use client";

import MDBox from "/components/MDBox";
import Row from "./row";
import MDTypography from "/components/MDTypography";
import { Link } from "@mui/material";

const renderGroup = ({ name, mailTemplates }) => {
  return (
    <MDBox>
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
          <Link href="#" underline="none">
            <MDTypography color="dark" variant="button">
              Habilitar todos
            </MDTypography>
          </Link>
          <Link href="#" underline="none">
            <MDTypography color="primary" variant="button">
              Desabilitar todos
            </MDTypography>
          </Link>
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
          mailTemplates.map((template) => {
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

export default function Table({ groups, templates }) {
  return (
    <>
      <MDBox pt={3} px={6}>
        <MDTypography variant="h4" fontWeight="medium">
          Plantillas de email
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2}>
        {groups.map(renderGroup)}
      </MDBox>
    </>
  );
}
