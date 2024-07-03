"use client";

import MDBox from "/components/MDBox";
import Row from "./row";
import Icon from "@mui/material/Icon";
import MDTypography from "/components/MDTypography";
import { Link } from "@mui/material";

const renderGroup = ({ name, mailTemplates }, key) => {
  return (
    <MDBox key={key}>
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
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={6}
      >
        <MDTypography variant="h4" fontWeight="medium">
          Plantillas de email
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2}>
        {groups.map(renderGroup)}
      </MDBox>
    </>
  );
}
