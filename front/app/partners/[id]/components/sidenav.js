"use client";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";
import { useParams, usePathname } from "next/navigation";

export default function Sidenav() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { id } = useParams();

  const sidenavItems = [
    { icon: "person", label: "Perfil", href: `profile`, disabled: false },
    { icon: "menu", label: "Casos", href: "projects", disabled: false },
    {
      icon: "perm_contact_calendar",
      label: "Contactos",
      href: `contacts`,
      disabled: false,
    },
    { icon: "note", label: "Notas", href: "notes", disabled: false },
    { icon: "bar_chart", label: "Informe", href: "report", disabled: true },
    { icon: "receipt", label: "Facturas", href: "invoices", disabled: false },
    { icon: "trending_up", label: "Pagos", href: "payments", disabled: false },
    {
      icon: "description",
      label: "Propuestas",
      href: "proposals",
      disabled: false,
    },
    {
      icon: "note",
      label: "Notas de Crédito",
      href: "credit-notes",
      disabled: true,
    },
    {
      icon: "content_paste",
      label: "Proformas",
      href: "estimates",
      disabled: false,
    },
    { icon: "task", label: "Tareas", href: "tasks", disabled: false },
    {
      icon: "text_snippet",
      label: "Gastos",
      href: "expenses",
      disabled: false,
    },
    {
      icon: "refresh",
      label: "Suscripciones",
      href: "subscriptions",
      disabled: true,
    },
    { icon: "article", label: "Contratos", href: "contracts", disabled: true },
    { icon: "receipt_long", label: "Tickets", href: "tickets", disabled: true },
    {
      icon: "insert_drive_file",
      label: "Archivos",
      href: "files",
      disabled: true,
    },
    {
      icon: "security",
      label: "Caja Fuerte",
      href: "security",
      disabled: true,
    },
    {
      icon: "today",
      label: "Recordatorios",
      href: "remembers",
      disabled: true,
    },
    { icon: "room", label: "Mapa", href: "map", disabled: true },
  ];

  const renderSidenavItems = sidenavItems.map(
    ({ icon, label, href, disabled }, key) => {
      const itemKey = `item-${key}`;

      return (
        <MDBox
          key={itemKey}
          component="li"
          pt={key === 0 ? 0 : 1}
          bgColor={disabled ? "#f0f0f0" : "transparent"}
          p={1}
          borderRadius={2}
        >
          <MDTypography
            component="a"
            href={disabled ? `#` : `/partners/${id}/${href}`}
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            sx={({
              borders: { borderRadius },
              functions: { pxToRem },
              palette: { light },
              transitions,
            }) => ({
              display: "flex",
              alignItems: "center",
              borderRadius: borderRadius.md,
              padding: `${pxToRem(10)} ${pxToRem(16)}`,
              transition: transitions.create("background-color", {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.shorter,
              }),

              "&:hover": {
                pointerEvents: disabled ? "none" : "auto",
                backgroundColor: disabled ? null : light.main,
              },
            })}
          >
            <Icon
              fontSize="small"
              sx={{
                mr: 1.5,
                color: darkMode ? "white" : "dark",
                verticalAlign: "middle",
              }}
            >
              {icon}
            </Icon>
            {label}
          </MDTypography>
        </MDBox>
      );
    }
  );

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </MDBox>
    </Card>
  );
}
