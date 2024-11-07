"use client";

import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "/components/MDBox";
import DataTable from "/examples/Tables/DataTableServerPagination";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import { destroy } from "/actions/request-templates";
import { useRouter } from "next/navigation";

export default function Table({ rows, meta }) {
  const router = useRouter();
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const columns = [
    {
      accessor: "name",
      Header: "Nombre",
    },
    {
      accessor: "description",
      Header: "Descripción",
    },
    {
      accessor: "fields",
      Header: "template",
    },
    {
      accessor: "json",
      Header: "json",
    },
    {
      accessor: "actions",
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Editar" placement="top">
            <EditIcon
              fontSize="medium"
              color="warning"
              sx={{ ml: 3, cursor: "pointer" }}
              onClick={() => {
                router.push(`/request-templates/${row.original.id}/edit`);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 3, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
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
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
