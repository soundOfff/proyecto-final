"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Link from "next/link";
import { useMaterialUIController } from "/context";
import { Tooltip } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import MDTypography from "/components/MDTypography";
import { useParams } from "next/navigation";
import { destroy } from "/actions/notes";

export default function Table({ rows }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const params = useParams();

  const handleDelete = async (row) => {
    await destroy(row.original.id);
  };

  const columns = [
    {
      Header: "Nota",
      accessor: "description",
      Cell: ({ value }) => (
        <MDTypography dangerouslySetInnerHTML={{ __html: value }} />
      ),
    },
    {
      Header: "Creado",
      accessor: "createdAt",
    },
    {
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <Tooltip title="Eliminar">
          <Delete
            color="error"
            fontSize="medium"
            onClick={() => handleDelete(row)}
            sx={{ mr: 3, cursor: "pointer" }}
          />
        </Tooltip>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href={`/partners/${params.id}/notes/create`}>
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Nota
          </MDButton>
        </Link>
      </MDBox>
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
