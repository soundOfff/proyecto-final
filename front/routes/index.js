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
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
      },
      {
        name: "Logout",
        key: "logout",
        route: "/dashboard/sales",
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
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
      },
    ],
  },
  { type: "divider", key: "divider-1" },
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
    name: "Clientes",
    key: "clients",
    route: "/partners",
    icon: <Icon fontSize="medium">person</Icon>,
    noCollapse: true,
  },
  // { type: "divider", key: "divider-1" },
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
      { name: "Proformas", key: "pro-forms", route: "/pro-forms" },
      {
        name: "Facturas",
        key: "invoices",
        route: "/invoices",
      },
      {
        name: "Cobros",
        key: "payments",
        route: "/payments",
      },
      {
        name: "Notas de Crédito",
        key: "credit-notes",
        route: "/credit-notes",
      },
      {
        name: "Articulos",
        key: "articles",
        route: "/articles",
      },
    ],
  },
  {
    type: "collapse",
    name: "Suscripciones",
    key: "subscriptions",
    route: "/subscriptions",
    icon: <Icon fontSize="medium">refresh</Icon>,
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
    name: "Soporte",
    key: "supports",
    route: "/supports",
    icon: <Icon fontSize="medium">book_online</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Clientes Potenciales",
    key: "leads",
    route: "/leads",
    icon: <Icon fontSize="medium">wifi_calling_3</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Base De Conocimiento",
    key: "knowledge-bases",
    route: "/knowledge-bases",
    icon: <Icon fontSize="medium">folder</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Utilidades",
    key: "utilities",
    icon: <Icon fontSize="medium">balance</Icon>,
    collapse: [
      {
        name: "Multimedia",
        key: "multimedia",
        route: "/multimedia",
      },
      {
        name: "Exportador en masa PDF",
        key: "export-pdf",
        route: "/export-pdf",
      },
      {
        name: "Calendario",
        key: "calendary",
        route: "/calendary",
      },
      {
        name: "Metas",
        key: "goals",
        route: "/goals",
      },
      {
        name: "Encuestas",
        key: "surveys",
        route: "/surveys",
      },
    ],
  },
  {
    type: "collapse",
    name: "Informes",
    key: "reports",
    icon: <Icon fontSize="medium">leaderboard</Icon>,
    collapse: [
      {
        name: "Ventas",
        key: "report-sales",
        route: "/report-sales",
      },
      {
        name: "Gastos",
        key: "report-expenses",
        route: "/report-expenses",
      },
      {
        name: "Gastos vs Ingresos",
        key: "expenses_vs_income",
        route: "/report-expenses-vs-income",
      },
      {
        name: "Metas",
        key: "report-goals",
        route: "/report-goals",
      },
      {
        name: "Encuestas",
        key: "report-leads",
        route: "/report-leads",
      },
      {
        name: "Resumen de Tabla de Tiempos",
        key: "report-timesheets",
        route: "/report-timesheets",
      },
      {
        name: "Articulos De Conocimiento",
        key: "knowledge-base-articles",
        route: "/report-knowledge-base-articles",
      },
    ],
  },
  {
    type: "collapse",
    name: "Configuracion",
    key: "settings",
    route: "/settings",
    icon: <Icon fontSize="medium">settings</Icon>,
    noCollapse: true,
  },
  // { type: "divider", key: "divider-0" },
  // { type: "title", title: "Vistas", key: "title-projects" },
  // {
  //   type: "collapse",
  //   name: "Applications",
  //   key: "applications",
  //   icon: <Icon fontSize="medium">apps</Icon>,
  //   collapse: [
  //     {
  //       name: "Kanban",
  //       key: "kanban",
  //       route: "/applications/kanban",
  //     },
  //     {
  //       name: "Wizard",
  //       key: "wizard",
  //       route: "/applications/wizard",
  //     },
  //     {
  //       name: "Data Tables",
  //       key: "data-tables",
  //       route: "/applications/data-tables",
  //     },
  //     {
  //       name: "Calendar",
  //       key: "calendar",
  //       route: "/applications/calendar",
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Ecommerce",
  //   key: "ecommerce",
  //   icon: <Icon fontSize="medium">shopping_basket</Icon>,
  //   collapse: [
  //     {
  //       name: "Products",
  //       key: "products",
  //       collapse: [
  //         {
  //           name: "New Product",
  //           key: "new-product",
  //           route: "/ecommerce/products/new-product",
  //         },
  //         {
  //           name: "Edit Product",
  //           key: "edit-product",
  //           route: "/ecommerce/products/edit-product",
  //         },
  //         {
  //           name: "Product Page",
  //           key: "product-page",
  //           route: "/ecommerce/products/product-page",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Orders",
  //       key: "orders",
  //       collapse: [
  //         {
  //           name: "Order List",
  //           key: "order-list",
  //           route: "/ecommerce/orders/order-list",
  //         },
  //         {
  //           name: "Order Details",
  //           key: "order-details",
  //           route: "/ecommerce/orders/order-details",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Authentication",
  //   key: "authentication",
  //   icon: <Icon fontSize="medium">content_paste</Icon>,
  //   collapse: [
  //     {
  //       name: "Sign In",
  //       key: "sign-in",
  //       collapse: [
  //         {
  //           name: "Basic",
  //           key: "basic",
  //           route: "/authentication/sign-in/basic",
  //         },
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/sign-in/cover",
  //         },
  //         {
  //           name: "Illustration",
  //           key: "illustration",
  //           route: "/authentication/sign-in/illustration",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Sign Up",
  //       key: "sign-up",
  //       collapse: [
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/sign-up/cover",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Reset Password",
  //       key: "reset-password",
  //       collapse: [
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/reset-password/cover",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default routes;
