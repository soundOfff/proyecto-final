"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { destroy } from "/actions/procedures";
import { editSteps } from "/actions/procedures";
import { useMaterialUIController } from "/context";
import update from "immutability-helper";
import useDeleteRow from "/hooks/useDeleteRow";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDAvatar from "/components/MDAvatar";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import DeleteRow from "/components/DeleteRow";
import { Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Procedures({ procedures }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [records, setRecords] = useState(procedures);
  const pathname = usePathname();
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Responsable",
      accessor: "responsible",
      Cell: ({ value }) =>
        value && (
          <MDBox key={value.id} display="inline-block" mr={2}>
            {value.profileImage && (
              <MDAvatar
                src={value?.profileImage}
                alt="profile-image"
                size="md"
                shadow="sm"
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  height: "2rem",
                  width: "2rem",
                }}
              />
            )}
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              mr={2}
            >
              {value.name}
            </MDTypography>
          </MDBox>
        ),
    },
    {
      id: "acciones",
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Editar Procedimiento">
            <Link href={`/procedures/${row.original.id}`}>
              <EditIcon color="warning" fontSize="medium" />
            </Link>
          </Tooltip>
          <Tooltip title="Eliminar Procedimiento">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    const updatedRecords = update(records, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    });

    setRecords(
      updatedRecords.map((record, index) => ({
        ...record,
        stepNumber: index + 1,
      }))
    );
  };

  useEffect(() => {
    editSteps({ procedures: records });
  }, [records]);

  const table = { columns, rows: records };

  return (
    <>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href={`${pathname}/create-procedure`}>
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Agregar Procedimiento
          </MDButton>
        </Link>
      </MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={false}
        moveRow={moveRow}
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
    </>
  );
}
