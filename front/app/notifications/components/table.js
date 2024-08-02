"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import moment from "moment";

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
        <MDTypography variant="body3">
          {moment(row.original.createdAt).format("DD/MM/YYYY HH:mm")}
        </MDTypography>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDTypography variant="h4" mb={3}>
        Notificaciones
      </MDTypography>
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
