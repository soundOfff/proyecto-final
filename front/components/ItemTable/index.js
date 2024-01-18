"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { DeleteOutline } from "@mui/icons-material";
import numberFormat from "/utils/numberFormat";
import { Grid } from "@mui/material";

export default function Table({ formData }) {
  const { values, setFieldValue, formField } = formData;
  const columns = [
    {
      Header: "Articulo",
      accessor: "description",
    },
    {
      Header: "Descripción",
      accessor: "longDescription",
    },
    {
      Header: "Tipo de articulo",
      accessor: "type",
    },
    {
      Header: () => values[formField.unit.name],
      accessor: "quantity",
    },
    {
      Header: "Precio",
      accessor: "rate",
    },
    {
      Header: "Impuestos",
      accessor: "taxes",
      Cell: ({ value }) =>
        value
          ? value.map((tax) => `${tax.name} ${tax.taxRate}%`).join(" | ")
          : null,
    },
    {
      Header: "Descuento",
      accessor: "discount",
    },
    {
      id: "amount",
      Header: "Importe",
      Cell: ({ row }) =>
        numberFormat(row.original.quantity * row.original.rate),
    },
    {
      id: "add-item",
      Cell: ({ row }) => {
        return (
          <MDBox lineHeight={0} color="dark">
            <MDButton
              iconOnly
              size="large"
              onClick={() => {
                setFieldValue(
                  "items",
                  values.items.filter((_, index) => index != row.id)
                );
              }}
            >
              <DeleteOutline color="error" />
            </MDButton>
          </MDBox>
        );
      },
    },
  ];

  const table = {
    columns,
    rows: values.items,
  };

  return (
    <Grid item xs={12}>
      <MDBox sx={{ maxWidth: "100%" }}>
        <DataTable
          table={table}
          entriesPerPage={false}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
        />
      </MDBox>
    </Grid>
  );
}
