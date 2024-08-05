/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the NextJS Material Dashboard 2 PRO are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
*/

// NextJS Material Dashboard 2 PRO components
import MDAvatar from "/components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "/assets/images/team-3.jpg";

const routes = [
  {
    type: "collapse",
    name: "Guest",
    key: "profile-user",
    icon: <MDAvatar src={profilePicture.src} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "Cerrar Sesión",
        key: "logout",
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Tablero",
    key: "dashboards",
    icon: <Icon fontSize="medium">home</Icon>,
    collapse: [
      {
        name: "Tareas",
        key: "dashboard-tasks",
        route: "/dashboards/tasks",
      },
    ],
  },
  { type: "divider", key: "divider-1" },
  {
    type: "collapse",
    name: "Clientes",
    key: "partners",
    route: "/partners",
    icon: <Icon fontSize="medium">person</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Casos",
    key: "projects",
    route: "/projects",
    icon: <Icon fontSize="medium">menu</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ventas",
    key: "sales",
    icon: <Icon fontSize="medium">balance</Icon>,
    collapse: [
      {
        name: "Propuestas",
        key: "proposals",
        route: "/proposals",
      },
      { name: "Proformas", key: "estimates", route: "/estimates" },
      {
        name: "Facturas",
        key: "invoices",
        route: "/invoices",
      },
      { name: "Notas de Crédito", key: "credit_notes", route: "/credit-notes" },
      { name: "Cobros", key: "payments", route: "/payments" },
    ],
  },
  {
    type: "collapse",
    name: "Gastos",
    key: "expenses",
    route: "/expenses",
    icon: <Icon fontSize="medium">description</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tareas",
    key: "tasks",
    route: "/tasks",
    icon: <Icon fontSize="medium">list</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notificaciones",
    key: "notifications",
    route: "/notifications",
    icon: <Icon fontSize="medium">notifications</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Archivos",
    key: "files",
    route: "/files",
    icon: <Icon fontSize="medium">insert_drive_file</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Informes",
    key: "reports",
    icon: <Icon fontSize="medium">leaderboard</Icon>,
    collapse: [
      {
        name: "Resumen de Tabla de Tiempos",
        key: "report-timesheets",
        route: "/report-timesheets",
      },
    ],
  },
  {
    type: "collapse",
    name: "Procesos",
    key: "processes",
    route: "/processes",
    icon: <Icon fontSize="medium">playlist_add_check</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Equipo",
    key: "staffs",
    route: "/staffs",
    icon: <Icon fontSize="medium">people</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Plantilla de Emails",
    key: "mail-templates",
    route: "/mail-templates",
    icon: <Icon fontSize="medium">mail</Icon>,
    noCollapse: true,
  },
];

export default routes;
