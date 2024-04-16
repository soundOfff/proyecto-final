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
    { icon: "person", label: "Perfil", href: `profile` },
    { icon: "perm_contact_calendar", label: "Contactos", href: `contacts` },
    { icon: "note", label: "Notas", href: "notes" },
    { icon: "bar_chart", label: "Informe", href: "report" },
    { icon: "receipt", label: "Facturas", href: "invoices" },
    { icon: "trending_up", label: "Pagos", href: "payments" },
    { icon: "description", label: "Propuestas", href: "proposals" },
    { icon: "note", label: "Notas de Crédito", href: "credit-notes" },
    { icon: "content_paste", label: "Proformas", href: "estimates" },
    { icon: "refresh", label: "Suscripciones", href: "subscriptions" },
    { icon: "text_snippet", label: "Gastos", href: "expenses" },
    { icon: "article", label: "Contratos", href: "contracts" },
    { icon: "menu", label: "Casos", href: "projects" },
    { icon: "task", label: "Tareas", href: "tasks" },
    { icon: "receipt_long", label: "Tickets", href: "tickets" },
    { icon: "insert_drive_file", label: "Archivos", href: "files" },
    { icon: "security", label: "Caja Fuerte", href: "security" },
    { icon: "today", label: "Recordatorios", href: "remembers" },
    { icon: "room", label: "Mapa", href: "map" },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <MDBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <MDTypography
          component="a"
          href={`/partners/${id}/${href}`}
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
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={darkMode ? "white" : "dark"}>
            <Icon fontSize="small">{icon}</Icon>
          </MDBox>
          {label}
        </MDTypography>
      </MDBox>
    );
  });

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
