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
import MDSnackbar from "/components/MDSnackbar";
import Loader from "../../components/loader";

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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { attachTasks } from "/actions/projects";

export default function Table() {
  const [controller, dispatch] = useMaterialUIController();
  const { currentTimer, darkMode } = controller;

  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const { statuses, priorities, project, repeats, tagsData, partners } =
    useDataProvider();
  const { data: session } = useSession();

  const handleStatusChange = async (taskId, statusId) => {
    await update(taskId, { task_status_id: statusId });
  };

  const handlePriorityChange = async (taskId, priorityId) => {
    await update(taskId, { task_priority_id: priorityId });
  };

  const handleCreateTasks = async () => {
    setIsFetching(true);
    try {
      await attachTasks(project?.id);
      setIsToastOpen(true);
    } catch (error) {
      setIsToastOpen(false);
      console.error(error);
    }
    setIsFetching(false);
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
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
      include: ["assigneds", "tags", "status"],
    }).then((data) => {
      setRows(data);
      setIsLoading(false);
    });
  }, [project]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
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
          value={statuses?.find(
            (status) => status.id === row.original.status_id
          )}
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
          onChange={(priority) => {
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
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Iniciar temporizador">
              <AccessAlarm
                color="success"
                fontSize="medium"
                onClick={() => startTimer(row.original.id, session.staff.id)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox width="100%">
      <MDSnackbar
        color="success"
        icon="info"
        title="Tareas creadas correctamente"
        content="Se han creado todas las tareas del proceso correctamente"
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        close={() => setIsToastOpen(false)}
        bgWhite
      />
      <MDBox display="flex" justifyContent="flex-end" mr={5} mt={2}>
        <MDBox width="100%" display="flex" gap={5} justifyContent="flex-end">
          <Tooltip title="Solamente se puede crear desde el proceso si el proyecto tiene un responsable">
            <MDBox>
              {project?.process && (
                <MDButton
                  variant="gradient"
                  color={"info"}
                  disabled={!project?.responsiblePerson || isFetching}
                  onClick={handleCreateTasks}
                >
                  Crear tareas desde el proceso
                </MDButton>
              )}
            </MDBox>
          </Tooltip>
          <MDButton
            variant="gradient"
            color={darkMode ? "light" : "dark"}
            onClick={handleModalOpen}
          >
            Crear nueva tarea
          </MDButton>
        </MDBox>
        {isModalOpen && (
          <Modal open={handleModalOpen} onClose={handleModalClose} width="40%">
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableItems={[]}
              tagsData={tagsData}
              partners={partners}
              task={{
                taskable: { id: project.id },
                taskable_type: "project",
                partner_id: project.defendant.id,
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
