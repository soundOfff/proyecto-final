"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { DeleteOutline } from "@mui/icons-material";
import numberFormat from "/utils/numberFormat";
import { Grid } from "@mui/material";

export default function Table({ formData, types }) {
  const { values, setFieldValue, formField } = formData;

  const columns = [
    {
      Header: "Artículo",
      accessor: "description",
    },
    {
      Header: "Descripción",
      accessor: "longDescription",
      width: "40%",
      Cell: ({ value, row }) => {
        return value ?? row.original.long_description;
      },
    },
    {
      Header: "Tipo de artículo",
      accessor: "line_item_type_id",
      Cell: ({ value, row }) => {
        return value
          ? types.find((type) => type.id === value)?.label
          : row.original.type
          ? types.find((type) => type.id === row.original.type)?.label
          : null;
      },
    },
    {
      Header: () => values[formField.unit.name],
      accessor: "quantity",
      Cell: ({ value }) => <MDBox textAlign="center">{value}</MDBox>,
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
          ? value.map((tax) => `${tax.name} ${tax.rate}%`).join(" | ")
          : null,
    },
    {
      Header: "Descuento",
      accessor: "discount",
      Cell: ({ value }) => value ?? "0",
    },
    {
      id: "amount",
      Header: "Importe",
      Cell: ({ row }) =>
        numberFormat(row.original.quantity * row.original.rate),
    },
    {
      id: "remove-item",
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
