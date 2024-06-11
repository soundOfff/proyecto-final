"use client";

import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";
import Link from "next/link";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalContentForm from "/components/ModalContent/Task";
import { Autocomplete, Grid, Tooltip } from "@mui/material";

import { destroy } from "/actions/tasks";

import { MODAL_TYPES } from "/utils/constants/modalTypes";
import Show from "./show";
import { AccessAlarm, LockClockOutlined, NoteAdd } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

import useTaskTable from "/hooks/useTaskTable";
import Header from "./show/header";

export default function Table({
  rows,
  meta,
  priorities,
  repeats,
  taskableItems,
  tagsData,
  statuses,
  dependencyTasks,
  partners,
  currentTimer,
  currentTaskId,
  actionsData,
  tableFields,
  partnerId,
}) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    optimisticRows,
    task,
    openEditModal,
    openShowModal,
    handleCloseEditModal,
    handleCloseShowModal,
    stopTimer,
    startTimer,
    handleStatusChange,
    handlePriorityChange,
    handleCompleteTask,
    setOpenShowModal,
    setOpenEditModal,
    setTaskId,
  } = useTaskTable({ rows, dispatch, currentTaskId });
  const { darkMode } = controller;
  const { data: session } = useSession();

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
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Bloqueada por",
      accessor: "isBlocked",
      Cell: ({ row }) =>
        row.original.isBlocked ? (
          <MDBox display="flex">
            {row.original.dependencies.map((dependency) => (
              <Grid key={dependency.id}>
                <MDBadge
                  variant="gradient"
                  color={
                    dependency.status_id === DONE_STATUS_ID ? "success" : "dark"
                  }
                  size="lg"
                  badgeContent={`#${dependency.id}`}
                />
              </Grid>
            ))}
          </MDBox>
        ) : (
          <MDTypography variant="caption" color="dark">
            Desbloqueada
          </MDTypography>
        ),
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) =>
        row.original.isBlocked ? (
          <MDBox width="100%" display="flex" justifyContent="start">
            <MDTypography variant="body2" color="dark">
              {row.original.name}
            </MDTypography>
          </MDBox>
        ) : (
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
      Cell: ({ row }) => {
        return (
          <Autocomplete
            value={statuses?.find(
              (status) => status.id === row.original.status.id
            )}
            disabled={row.original.isBlocked || !row.original.canChangeStatus}
            onChange={(e, status) => {
              handleStatusChange(row.original.id, status.id);
            }}
            options={statuses}
            sx={{ width: "150px" }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <MDInput {...params} variant="standard" fullWidth />
            )}
          />
        );
      },
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
      width: 200,
      Cell: ({ row }) => (
        <Autocomplete
          value={priorities.find(
            (priority) => priority.id === row.original.priority.id
          )}
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
          sx={{ width: "150px" }}
        />
      ),
    },
    {
      Header: "Autor",
      accessor: "author",
      Cell: ({ value }) => value && value.name,
    },
    {
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Agregar Archivo">
            <Link
              href={{
                pathname: "/files/create",
                query: { taskId: row.original.id },
              }}
            >
              <NoteAdd
                color="warning"
                fontSize="medium"
                sx={{ mr: 1, cursor: "pointer" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Editar tarea">
            <EditNoteIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setTaskId(row.original.id);
                setOpenEditModal(true);
              }}
              sx={{ mr: 1, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{
                mx: 1,
                cursor: "pointer",
                display: row.original.isBlocked ? "none" : "block",
              }}
            />
          </Tooltip>
          <Tooltip title="Ver Cambios">
            <Link href={`/tasks/${row.original.id}/changes`}>
              <VisibilityIcon
                color="action"
                fontSize="medium"
                sx={{ mx: 1, cursor: "pointer" }}
              />
            </Link>
          </Tooltip>
          {currentTimer?.task_id === row.original.id ? (
            <Tooltip title="Detener temporizador">
              <LockClockOutlined
                color="error"
                fontSize="medium"
                onClick={() => stopTimer(currentTimer?.id)}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: row.original.isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Iniciar temporizador">
              <AccessAlarm
                color="success"
                fontSize="medium"
                onClick={() => startTimer(row.original.id, session.staff.id)}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: row.original.isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          )}
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows: optimisticRows };

  return (
    <MDBox>
      <MDBox width="100%" display="flex" gap={5} justifyContent="flex-end">
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={() => {
            setOpenEditModal(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
      </MDBox>
      {openEditModal && (
        <Modal open={openEditModal} onClose={handleCloseEditModal} width="40%">
          <ModalContentForm
            priorities={priorities}
            repeats={repeats}
            taskableItems={taskableItems}
            dependencyTasks={dependencyTasks}
            tagsData={tagsData}
            partners={partners}
            task={task}
            actionsData={actionsData}
            tableFields={tableFields}
            partnerId={partnerId}
            mode={task ? MODAL_TYPES.EDIT : MODAL_TYPES.CREATE}
          />
        </Modal>
      )}
      {openShowModal && (
        <Modal
          open={openShowModal}
          onClose={handleCloseShowModal}
          px={0}
          py={0}
          sx={{ overflow: "scroll" }}
        >
          {task && (
            <Show
              task={task}
              markAsCompleted={handleCompleteTask}
              isTimerStarted={currentTimer?.task_id === task.id}
              currentTimerId={currentTimer?.id}
              stopTimer={stopTimer}
              startTimer={startTimer}
            />
          )}
        </Modal>
      )}
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
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
