"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { destroy } from "/actions/procedures";
import { editSteps } from "/actions/procedures";
import { useMaterialUIController } from "/context";
import update from "immutability-helper";
import useDeleteRow from "/hooks/useDeleteRow";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DeleteRow from "/components/DeleteRow";
import { Switch, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Procedures({ procedures, actionTypes, processId }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [records, setRecords] = useState(procedures);
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const getActionsColumns = () => {
    return actionTypes.map((actionType) => {
      return {
        Header: actionType.label,
        accessor: actionType.name,
        Cell: ({ row }) => {
          return (
            <MDBox display="flex" justifyContent="center" width="100%">
              <Switch
                name={actionType.name}
                label={actionType.label}
                disabled={true}
                checked={row.original.actions.some(
                  (action) => action.type.id === actionType.id
                )}
              />
            </MDBox>
          );
        },
      };
    });
  };

  useEffect(() => {
    setRecords(procedures);
  }, [procedures]);

  const columns = [
    {
      Header: "N° de Paso",
      accessor: "stepNumber",
      width: 100,
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Autor",
      accessor: "author",
      Cell: ({ value }) => value && value.name,
    },
    ...getActionsColumns(),
    {
      id: "acciones",
      Header: "",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Editar Procedimiento">
            <Link href={`/procedures/${row.original.id}`}>
              <EditIcon color="info" fontSize="medium" />
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
    if (records.length > 0) {
      setTimeout(() => {
        editSteps({ procedures: records });
      }, 1000);
    }
  }, [records]);

  const table = { columns, rows: records };

  return (
    <>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href={{ pathname: "/procedures/create", query: { processId } }}>
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Agregar Procedimiento
          </MDButton>
        </Link>
      </MDBox>
      <DataTable
        table={table}
        entriesPerPage={{ defaultValue: 50 }}
        showTotalEntries={false}
        moveRow={moveRow}
        isSorted={false}
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
