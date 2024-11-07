"use client";

import Row from "./row";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import { disableGroup } from "/actions/mail-templates";
import { useState } from "react";

import Link from "next/link";
import { Icon, Menu, MenuItem } from "@mui/material";

const renderGroup = ({ name, mailTemplates, selectedLang, id, index }) => {
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
            Deshabilitar todos
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
            .filter((template) => template.lang.code === selectedLang)
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

export default function Table({ groups, langs }) {
  const [selectedLang, setSelectedLang] = useState("en");
  const [menu, setMenu] = useState(null);

  const closeMenu = () => setMenu(null);

  const openMenu = (event) => setMenu(event.currentTarget);

  const renderMenu = () => (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      {langs.map((lang) => (
        <MenuItem
          key={lang.code}
          onClick={() => {
            setSelectedLang(lang.code);
            closeMenu();
          }}
        >
          {lang.name}
        </MenuItem>
      ))}
    </Menu>
  );

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
        <MDBox display="flex" justifyContent="center" gap={4}>
          <MDButton
            variant="contained"
            color="dark"
            size="small"
            onClick={openMenu}
          >
            {langs.find((lang) => lang.code === selectedLang).name}
            <Icon>keyboard_arrow_down</Icon>
          </MDButton>
          {renderMenu()}
          <Link href="/mail-templates/create">
            <MDButton type="button" variant="gradient" color="dark">
              Crear plantillas
            </MDButton>
          </Link>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2}>
        {groups.map((group, index) =>
          renderGroup({ ...group, selectedLang, index })
        )}
      </MDBox>
    </>
  );
}
