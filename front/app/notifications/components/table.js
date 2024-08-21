"use client";
import { useState } from "react";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArchiveIcon from "@mui/icons-material/Archive";

import moment from "moment";
import "moment/locale/es";

import { updateMany } from "/actions/notifications";

export default function Table({ rows, meta = { per_page: 5, page: 1 } }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);

  const handleUpdateNotification = async (id) => {
    try {
      await updateMany({ notification_ids: [id] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNotifications = async () => {
    setIsUpdating(true);
    try {
      await updateMany({ notification_ids: selectedNotificationIds });
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedNotificationIds([]);
    }
    setIsUpdating(false);
  };

  const columns = [
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
            <RemoveRedEyeIcon
              sx={{ cursor: "pointer" }}
              fontSize="medium"
              color="info"
              onClick={() => handleUpdateNotification(row.original.id)}
            />
          </Tooltip>
          <Tooltip title="Archivar" placement="top">
            <ArchiveIcon
              sx={{ cursor: "pointer" }}
              fontSize="medium"
              color="dark"
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox width="100%" display="flex" justifyContent="end" gap={4}>
        <MDButton
          color="info"
          size="small"
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleUpdateNotifications}
          disabled={isUpdating || selectedNotificationIds.length === 0}
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
          disabled={selectedNotificationIds.length === 0}
          sx={{ mb: 2 }}
          onClick={() => {
            console.log("selectedNotificationIds", selectedNotificationIds);
          }}
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
