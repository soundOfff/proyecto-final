"use client";

import { show } from "/actions/tasks";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDInput from "/components/MDInput";
import Modal from "/components/Modal";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import Link from "next/link";
import ModalContentForm from "../../../components/ModalContent/Task/form";
import { Autocomplete, Grid, Tooltip } from "@mui/material";

export default function Table({
  rows,
  meta,
  priorities,
  repeats,
  taskableTypes,
  taskeableItems,
  tagsData,
  statuses,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [taskId, setTaskId] = useState(null);
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchTask = async () => {
      setTask(
        await show(taskId, {
          include: ["staff", "tags", "priority", "status"],
        })
      );
    };
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <Link
          href={`/tasks/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <Autocomplete
          value={row.original.status}
          options={statuses}
          sx={{ width: "12rem" }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput {...params} variant="standard" fullWidth />
          )}
        />
      ),
    },
    {
      Header: "Fecha de inicio",
      accessor: "start_date",
    },
    {
      Header: "Fecha de vencimiento",
      accessor: "due_date",
    },
    {
      // TODO: make accessor works
      Header: "Asignar a",
      accessor: "",
      Cell: ({ row }) => {
        return row.original.staff?.map((staff) => (
          <Link
            href={`/partners/${staff.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {staff.first_name} {staff.last_name}
          </Link>
        ));
      },
    },
    {
      Header: "Etiquetas",
      accessor: "labels",
      Cell: ({ row }) =>
        row.original.tags &&
        row.original.tags.map((tag) => (
          <Grid key={tag.id}>
            <MDBadge
              variant="contained"
              color="info"
              size="md"
              badgeContent={tag.name}
            />
          </Grid>
        )),
    },
    {
      Header: "Prioridad",
      accessor: "priority",
      Cell: ({ row }) => (
        <Autocomplete
          value={row.original.priority}
          options={priorities}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      ),
    },
    {
      Header: "Acciones",
      accessor: "",
      Cell: ({ row }) => (
        <>
          <Tooltip title="Vista Rápida">
            <FlashOnIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setOpen(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Editar tarea">
            <EditNoteIcon
              color="warning"
              onClick={() => setTaskId(row.original.id)}
              fontSize="medium"
            />
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                // setProjectIdDelete(row.original.id);
              }}
              sx={{ ml: 3, cursor: "pointer" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
        {open && (
          <Modal open={open} onClose={handleClose} width="40%">
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableTypes={taskableTypes}
              taskeableItems={taskeableItems}
              tagsData={tagsData}
            />
          </Modal>
        )}
      </MDBox>
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
