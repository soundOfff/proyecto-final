"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { Icon, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "Articulo",
      accessor: "description",
      Cell: ({ value, row }) => {
        return (
          <FormField
            name="Descripcion"
            label=""
            type="text"
            value={value}
            placeholder="Articulo"
            multiline
            rows={4}
          />
        );
      },
    },
    {
      Header: "Descripcion",
      accessor: "long_description",
      Cell: ({ value, row }) => {
        return (
          <FormField
            name="long_description"
            label=""
            type="text"
            value={value}
            placeholder="Descripcion"
            multiline
            rows={4}
          />
        );
      },
    },
    {
      Header: "Tipo de articulo",
      accessor: "type",
      // Render if a item is checked
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
      Cell: ({ value, row }) => {
        return (
          <FormField
            name="long_description"
            label=""
            value={value}
            type="text"
            placeholder="cantidad"
          />
        );
      },
    },
    {
      Header: "Precio",
      accessor: "rate",
      id: "rate",
      Cell: ({ value, row }) => {
        return (
          <FormField
            name="rate"
            label=""
            type="text"
            value={value}
            placeholder="Precio"
          />
        );
      },
    },
    {
      Header: "Impuestos",
      accessor: "taxes",
    },
    {
      Header: "Descuentos",
      accessor: "item_discount",
      // Render if a item is checked
    },
    {
      Header: "Importe",
      accessor: "rate",
      id: "read-only-rate",
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ value, row }) => {
        return (
          <MDBox lineHeight={0} color={"dark"}>
            <Tooltip title="Agregar item" placement="top">
              <CheckIcon
                sx={{ cursor: "pointer" }}
                fontSize="medium"
              ></CheckIcon>
            </Tooltip>
          </MDBox>
        );
      },
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox sx={{ maxWidth: "100%" }}>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={false}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
