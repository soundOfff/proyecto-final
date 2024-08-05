"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import moment from "moment";
import "moment/locale/es";
import { Tooltip } from "@mui/material";

export default function Table({ rows, meta = { per_page: 5, page: 1 } }) {
  const columns = [
    {
      Header: "Nombre",
      accessor: "title",
      Cell: ({ row }) => (
        <MDTypography variant="body3" fontWeight="medium">
          {row.original.title}
        </MDTypography>
      ),
    },
    {
      Header: "Descripción",
      width: "50%",
      accessor: "body",
    },
    {
      Header: "Fecha de envio",
      accessor: "created_at",
      Cell: ({ row }) => (
        <Tooltip title={moment(row.original.createdAt).format("LLL")}>
          <MDTypography variant="body3" sx={{ ml: 1 }}>
            {moment(row.original.createdAt).locale("es").fromNow()}
          </MDTypography>
        </Tooltip>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
