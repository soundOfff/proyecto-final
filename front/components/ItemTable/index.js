"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";
import { show } from "/actions/expenses";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import { Tooltip } from "@mui/material";
import { FlashOnOutlined } from "@mui/icons-material";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "Articulo",
      accessor: "description",
    },
    {
      Header: "Descripcion",
      accessor: "long_description",
    },
    {
      Header: "Tipo de articulo",
      accessor: "type",
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
    },
    {
      Header: "Precio",
      accessor: "rate",
      id: "rate",
    },
    {
      Header: "Impuestos",
      accessor: "taxes",
    },
    {
      Header: "Descuentos",
      accessor: "item_discount",
    },
    {
      Header: "Importe",
      accessor: "rate",
      id: "read-only-rate",
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
