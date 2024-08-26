"use client";
import { useState } from "react";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LinkIcon from "@mui/icons-material/Link";
import ArchiveIcon from "@mui/icons-material/Archive";

import MDSnackbar from "/components/MDSnackbar";

import moment from "moment";
import "moment/locale/es";

import { updateMany, archiveMany } from "/actions/notifications";
import Link from "next/link";
import { MAPPED_NOTIFIABLE_TYPES } from "/utils/constants/notifiableTypes";

export default function Table({ rows, meta = { per_page: 5, page: 1 } }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState("");
  const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);

  const allRowsAreSeen = selectedNotificationIds.every(
    (rowId) => rows.find((row) => row.id === rowId)?.isSeen
  );

  const getResourceUrl = (notifiableType, notifiableId) =>
    MAPPED_NOTIFIABLE_TYPES[notifiableType].url + notifiableId;

  const handleUpdateSeen = async (id, isSeen) => {
    try {
      await updateMany({ notification_ids: [id], is_seen: Number(isSeen) });
      setSuccessSB(true);
      setInfoSB("Notificacion marcada como vista");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al marcar la notificacion como vista");
    }
  };

  const handleMarkAsSeenMultiple = async (isSeen = true) => {
    setIsUpdating(true);
    try {
      await updateMany({
        notification_ids: selectedNotificationIds,
        is_seen: Number(isSeen),
      });
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

  const handleArchiveMultiple = async (isSeen = true) => {
    setIsUpdating(true);
    try {
      await archiveMany({
        notification_ids: selectedNotificationIds,
        is_seen: Number(isSeen),
      });
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
          {row.original.notifiableType.length > 0 &&
            row.original.notifiableId != 0 && (
              <Tooltip title="Ir al recurso" placement="top">
                <Link
                  target="_blank"
                  href={getResourceUrl(
                    row.original.notifiableType,
                    row.original.notifiableId
                  )}
                >
                  <LinkIcon my="auto" fontSize="medium" color="success" />
                </Link>
              </Tooltip>
            )}
          <Tooltip title="marcar como no leido" placement="top">
            {row.original.isSeen ? (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <VisibilityOffIcon
                  fontSize="medium"
                  color={row.original.isSeen ? "text" : "info"}
                  onClick={() => handleUpdateSeen(row.original.id, false)}
                />
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <RemoveRedEyeIcon
                  fontSize="medium"
                  color={row.original.isSeen ? "text" : "info"}
                  onClick={() => handleUpdateSeen(row.original.id, true)}
                />
              </button>
            )}
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
          onClick={() => handleMarkAsSeenMultiple()}
          sx={{ mb: 2 }}
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
        entriesPerPage={{ defaultValue: 50, entries: [5, 10, 15, 20, 25, 50] }}
        isNotificable={true}
        canMultiSelect={true}
        setDeleteIds={setSelectedNotificationIds}
      />
    </MDBox>
  );
}
