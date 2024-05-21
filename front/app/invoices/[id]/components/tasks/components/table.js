"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

import Grid from "@mui/material/Grid";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import Autocomplete from "@mui/material/Autocomplete";

import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";

import { useDataProvider } from "/providers/DataProvider";

import { destroy, getAll } from "/actions/tasks";
import { update } from "/actions/tasks";
import { store as storeTimer, update as updateTimer } from "/actions/timers";
import { getCurrentTimer } from "/actions/timers";
import { setCurrentTimer, useMaterialUIController } from "/context";

import moment from "moment";
import ModalContentForm from "/components/ModalContent/Task";
import Modal from "/components/Modal";
import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { useSession } from "next-auth/react";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

export default function Table() {
  const [controller, dispatch] = useMaterialUIController();
  const { currentTimer, darkMode } = controller;
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optimisticRows, updateOptimisticRows] = useOptimistic(
    rows,
    (state, editedRow) => {
      const editedRowIndex = state.findIndex((row) => row.id === editedRow.id);
      const newState = [...state];
      newState[editedRowIndex] = editedRow;
      return newState;
    }
  );

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const { statuses, priorities, invoice, repeats, tagsData, partners } =
    useDataProvider();
  const { data: session } = useSession();

  const findTask = (taskId) => rows.find((row) => row.id === taskId);

  const handleStatusChange = async (taskId, statusId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.status.id = statusId;
      updateOptimisticRows(editedRow);
    });
    await update(taskId, { task_status_id: statusId });
  };

  const handlePriorityChange = async (taskId, priorityId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.priority.id = priorityId;
      updateOptimisticRows(editedRow);
    });
    await update(taskId, { task_priority_id: priorityId });
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const stopTimer = async (timerId, note = "") => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await updateTimer(timerId, { end_time: date, note });
    setCurrentTimer(dispatch, null);
  };

  const startTimer = async (taskId, staffId) => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await storeTimer({ task_id: taskId, start_time: date, staff_id: staffId });
    const currentTimer = await getCurrentTimer(staffId, {
      include: "task",
    });
    setCurrentTimer(dispatch, currentTimer);
  };

  useEffect(() => {
    getAll({
      "filter[taskable_id]": invoice.id,
      "filter[taskable_type]": "invoice",
      include: ["assigneds", "tags", "status", "dependencies"],
    }).then((data) => {
      setRows(data);
    });
  }, [invoice]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Bloqueada por",
      accessor: "isBlocked",
      Cell: ({ row }) =>
        row.original.isBlocked && (
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
        ),
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <MDTypography variant="body2" color="info" sx={{ cursor: "pointer" }}>
          {row.original.name}
        </MDTypography>
      ),
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <Autocomplete
          value={statuses.find((status) => status.id == row.original.status.id)}
          onChange={(e, status) => {
            handleStatusChange(row.original.id, status.id);
          }}
          disabled={row.original.isBlocked}
          options={statuses}
          sx={{ width: "150px" }}
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
      Header: "Acciones",
      accessor: "",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
          {currentTimer?.task_id === row.original.id ? (
            <Tooltip title="Detener temporizador">
              <LockClockOutlined
                color="error"
                fontSize="medium"
                onClick={() => stopTimer(currentTimer.id)}
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
    <MDBox width="100%">
      <MDBox display="flex" justifyContent="flex-end" mr={5} my={2}>
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={handleModalOpen}
        >
          Crear nueva tarea
        </MDButton>
        {isModalOpen && (
          <Modal open={handleModalOpen} onClose={handleModalClose} width="40%">
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableItems={[]}
              tagsData={tagsData}
              partners={partners}
              task={{
                taskable: { id: invoice.id },
                taskable_type: INVOICE_TYPE,
                partner_id: invoice.project?.defendant.id ?? invoice.partner.id,
              }}
              mode={MODAL_TYPES.CREATE}
            />
          </Modal>
        )}
      </MDBox>
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
