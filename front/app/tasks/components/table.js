"use client";

import { show } from "/actions/tasks";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import ModalContentForm from "../../../components/ModalContent/Task/index";
import { Autocomplete, Button, Grid, Link, Tooltip } from "@mui/material";

import { update } from "/actions/tasks";
import { MODAL_TYPES } from "../../../utils/constants/modalTypes";
import { destroy } from "../../../actions/tasks";
import Show from "./show";

export default function Table({
  rows,
  meta,
  priorities,
  repeats,
  taskableTypes,
  taskableItems,
  tagsData,
  statuses,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [taskId, setTaskId] = useState(null);
  const [task, setTask] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTaskId(null);
    setTask(null);
  };

  const handleCloseShowModal = () => {
    setOpenShowModal(false);
    setTaskId(null);
    setTask(null);
  };

  useEffect(() => {
    const fetchTask = async () => {
      setTask(
        await show(taskId, {
          include: [
            "tags",
            "priority",
            "status",
            "comments",
            "checklistItems",
            "assigneds",
            "followers",
            "taskable",
          ],
        })
      );
    };
    if (taskId && !task) {
      fetchTask();
    }
  }, [taskId, task]);

  const handleStatusChange = async (taskId, statusId) => {
    await update(taskId, { ticket_status_id: statusId });
  };

  const handlePriorityChange = async (taskId, priorityId) => {
    await update(taskId, { task_priority_id: priorityId });
  };

  useEffect(() => {
    const fetchTask = async () => {
      setTask(
        await show(taskId, {
          include: ["assigneds", "tags", "priority", "status", "taskable"],
        })
      );
    };
    if (taskId && !task) {
      fetchTask();
    }
  }, [taskId, task]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <MDTypography
          variant="body2"
          color="info"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setTaskId(row.original.id);
            setOpenShowModal(true);
          }}
        >
          {row.original.name}
        </MDTypography>
      ),
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <Autocomplete
          value={row.original.status}
          onChange={(e, status) => {
            handleStatusChange(row.original.id, status.id);
          }}
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
            key={staff.id}
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
              variant="gradient"
              color="dark"
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
          onChange={(e, priority) => {
            handlePriorityChange(row.original.id, priority.id);
          }}
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
            <EditNoteIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setTaskId(row.original.id);
                setOpenEditModal(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                destroy(row.original.id);
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
            setOpenEditModal(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
        {openEditModal && (
          <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            width="40%"
          >
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableTypes={taskableTypes}
              taskableItems={taskableItems}
              tagsData={tagsData}
              task={task}
              mode={task ? MODAL_TYPES.EDIT : MODAL_TYPES.CREATE}
            />
          </Modal>
        )}
      </MDBox>
      {openShowModal && (
        <Modal
          open={openShowModal}
          onClose={handleCloseShowModal}
          px={0}
          py={0}
        >
          {task && <Show task={task} />}
        </Modal>
      )}
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
