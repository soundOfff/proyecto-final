"use client";
import { useState } from "react";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArchiveIcon from "@mui/icons-material/Archive";
import MDSnackbar from "/components/MDSnackbar";

import moment from "moment";
import "moment/locale/es";

import { updateMany, archiveMany } from "/actions/notifications";

export default function Table({ rows, meta = { per_page: 5, page: 1 } }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState("");
  const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);

  const allRowsAreSeen = selectedNotificationIds.every(
    (rowId) => rows.find((row) => row.id === rowId)?.isSeen
  );

  const handleMarkAsSeen = async (id) => {
    try {
      await updateMany({ notification_ids: [id] });
      setSuccessSB(true);
      setInfoSB("Notificacion marcada como vista");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al marcar la notificacion como vista");
    }
  };

  const handleMarkAsSeenMultiple = async () => {
    setIsUpdating(true);
    try {
      await updateMany({ notification_ids: selectedNotificationIds });
      setSuccessSB(true);
      setInfoSB("Notificaciones marcadas como vistas");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al marcar las notificaciones como vistas");
    } finally {
      setSelectedNotificationIds([]);
    }
    setIsUpdating(false);
  };

  const handleArchive = async (id) => {
    try {
      await archiveMany({ notification_ids: [id] });
      setSuccessSB(true);
      setInfoSB("Notificacion archivada correctamente");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al marcar la notificacion como archivada");
    }
  };

  const handleArchiveMultiple = async () => {
    setIsUpdating(true);
    try {
      await archiveMany({ notification_ids: selectedNotificationIds });
      setSuccessSB(true);
      setInfoSB("Notificaciones archivadas correctamente");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al archivar las notificaciones");
    } finally {
      setSelectedNotificationIds([]);
    }
    setIsUpdating(false);
  };

  const renderSnackbar = () => {
    if (isUpdating) return;
    if (errorSB) {
      return (
        <MDSnackbar
          color="error"
          icon="warning"
          title="Error al actualizar notificaciones"
          content={infoSB}
          open={errorSB}
          onClose={() => setErrorSB(false)}
          close={() => setErrorSB(false)}
          bgWhite
        />
      );
    }

    if (successSB) {
      return (
        <MDSnackbar
          color="success"
          icon="check"
          title="Notificaciones actualizadas"
          content={infoSB}
          open={successSB}
          onClose={() => setSuccessSB(false)}
          close={() => setSuccessSB(false)}
          bgWhite
        />
      );
    }
  };

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "title",
      Cell: ({ row }) => (
        <MDTypography variant="body3" fontWeight="medium">
          {row.original.title}
        </MDTypography>
      ),
    },
    {
      Header: "Descripción",
      width: "50%",
      accessor: "body",
    },
    {
      Header: "Fecha de envio",
      accessor: "created_at",
      Cell: ({ row }) => (
        <Tooltip title={moment(row.original.createdAt).format("LLL")}>
          <MDTypography variant="body3" sx={{ ml: 1 }}>
            {moment(row.original.createdAt).locale("es").fromNow()}
          </MDTypography>
        </Tooltip>
      ),
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ row }) => (
        <MDBox display="flex" ml={1} gap={2}>
          <Tooltip title="Marcar como vista" placement="top">
            <button
              disabled={row.original.isSeen}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: row.original.isSeen ? "normal" : "pointer",
              }}
            >
              <RemoveRedEyeIcon
                fontSize="medium"
                color={row.original.isSeen ? "text" : "info"}
                onClick={() => handleMarkAsSeen(row.original.id)}
              />
            </button>
          </Tooltip>
          <Tooltip title="Archivar" placement="top">
            <ArchiveIcon
              sx={{ cursor: "pointer" }}
              fontSize="medium"
              color="dark"
              onClick={() => handleArchive(row.original.id)}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      {renderSnackbar()}
      <MDBox width="100%" display="flex" justifyContent="end" gap={4}>
        <MDButton
          color="info"
          size="small"
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleMarkAsSeenMultiple}
          disabled={
            isUpdating || selectedNotificationIds.length === 0 || allRowsAreSeen
          }
        >
          Marcar como vistas
          <RemoveRedEyeIcon
            sx={{
              ml: 1,
              mb: 0.5,
            }}
          />
        </MDButton>
        <MDButton
          color="dark"
          size="small"
          variant="contained"
          disabled={isUpdating || selectedNotificationIds.length === 0}
          sx={{ mb: 2 }}
          onClick={handleArchiveMultiple}
        >
          Archivar
          <ArchiveIcon
            sx={{
              ml: 1,
              mb: 0.5,
            }}
          />
        </MDButton>
      </MDBox>
      <DataTable
        table={table}
        showTotalEntries={false}
        isSorted={true}
        noEndBorder
        isNotificable={true}
        entriesPerPage={{ defaultValue: 50, entries: [5, 10, 15, 20, 25, 50] }}
        canMultiSelect={true}
        setDeleteIds={setSelectedNotificationIds}
      />
    </MDBox>
  );
}
