"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";
import { destroy, getAll } from "/actions/files";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";

export default function Table({ project }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFileableUrl = (row) => {
    switch (row.original.fileableType) {
      case "project":
        return `/projects/${row.original.fileableId}`;
      case "customer":
        return `/partners/${row.original.fileableId}`;
      default:
        return "/";
    }
  };

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  useEffect(() => {
    getAll({
      "filter[fileable_id]": project.id,
      "filter[fileable_type]": "project",
    }).then((data) => {
      setRows(data.data.files);
      setIsLoading(false);
    });
  }, [project]);

  const columns = [
    {
      id: "url",
      Header: "URL",
      accessor: "publicUrl",
      Cell: ({ value }) => (
        <Link href={value} sx={{ cursor: "pointer", color: "info" }}>
          {value}
        </Link>
      ),
    },
    {
      id: "fileable",
      Header: "Relacionado con",
      Cell: ({ row }) => (
        <Link
          href={getFileableUrl(row)}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.fileableType}: {row.original.fileableId}
        </Link>
      ),
    },
    {
      id: "acciones",
      Header: "Acciones",
      Cell: ({ row }) => (
        <Tooltip title="Eliminar Archivo">
          <DeleteIcon
            color="error"
            fontSize="medium"
            onClick={() => {
              handleDelete(row.original.id);
            }}
            sx={{ mx: 1, cursor: "pointer" }}
          />
        </Tooltip>
      ),
    },
  ];

  const table = { columns, rows };

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox>
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
