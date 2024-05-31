"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { destroy } from "/actions/procedures";
import { editSteps } from "/actions/procedures";
import { useMaterialUIController } from "/context";
import update from "immutability-helper";
import useDeleteRow from "/hooks/useDeleteRow";

import { update as updateProcedure } from "/actions/procedures";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DeleteRow from "/components/DeleteRow";
import { Switch, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Procedures({ procedures, actions }) {
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

  const handleActionsChange = async (e, row, action) => {
    const newActions = e.target.checked
      ? [...row.original.actions, action]
      : row.original.actions.filter((a) => a.name !== action.name);

    const newRecord = {
      ...row.original,
      actions: newActions,
    };

    const updatedRecords = update(records, {
      [row.index]: { $set: newRecord },
    });

    setRecords(updatedRecords);

    await updateProcedure(row.original.id, {
      process_id: row.original.processId,
      procedure_status_id: row.original.statusId,
      step_number: row.original.stepNumber,
      name: row.original.name,
      responsible_id: row.original.responsibleId,
      dependencies: row.original.dependencies,
      actions: newActions,
    });
  };

  const getActionsColumns = () => {
    return actions.map((action) => {
      return {
        Header: action.label,
        accessor: action.name,
        Cell: ({ row }) => (
          <MDBox display="flex" justifyContent="center" width="100%">
            <Switch
              name={action.name}
              label={action.label}
              onChange={(e) => handleActionsChange(e, row, action)}
              checked={row.original.actions.some((a) => a.name === action.name)}
            />
          </MDBox>
        ),
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
    ...getActionsColumns(),
    {
      id: "acciones",
      Header: "",
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
