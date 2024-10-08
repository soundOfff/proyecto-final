"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";

import DataTable from "/examples/Tables/DataTable";
import Loading from "./skeleton";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";
import MDInput from "/components/MDInput";

import { Tooltip, Tabs, Tab, Grid } from "@mui/material";

import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import { MAPPED_NOTIFIABLE_TYPES } from "/utils/constants/notifiableTypes";

import { updateMany, archiveMany, destroy } from "/actions/notifications";
import useTabs from "/hooks/useTabs";
import { INVOICE_TYPE, PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { getPriorityColor } from "/utils/project-state-colors";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_TYPES = [
  {
    tabIndex: 0,
    label: "Notificaciones",
    value: "notifications",
  },
  {
    tabIndex: 1,
    label: "Archivadas",
    value: "archived",
  },
];

export default function Table({ rows }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState("");
  const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);
  const [menu, setMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [search, setSearch] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleChange, selectedTab, isLoading } = useTabs({
    TAB_TYPES,
  });

  const allRowsAreSeen = selectedNotificationIds.every(
    (rowId) => rows.find((row) => row.id === rowId)?.isSeen
  );

  const allRowsAreArchived = selectedNotificationIds.every(
    (rowId) => rows.find((row) => row.id === rowId)?.isArchived
  );

  const openMenu = (event) => setMenu(event.currentTarget);

  const closeMenu = () => setMenu(null);

  const updateQueryParams = (params) => {
    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleFilterIsSeen = (isSeen = true) => {
    const params = new URLSearchParams(searchParams);
    params.set("isSeen", Boolean(isSeen));
    setSelectedFilter(isSeen ? "Vistas" : "No vistas");
    closeMenu();
    updateQueryParams(params);
  };

  const removeIsSeenFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("isSeen");
    setSelectedFilter(null);
    closeMenu();
    updateQueryParams(params);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setTimeout(() => {
      setSearch(searchValue.length > 1 ? searchValue : null);
    }, 300);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (params.get("isSeen")) {
      setSelectedFilter(
        params.get("isSeen") === "true" ? "Vistas" : "No vistas"
      );
    }

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    updateQueryParams(params);
  }, [search]);

  const getResourceUrl = (notifiableType, notifiableId) => {
    if (notifiableId == 0) {
      return "#";
    }
    return MAPPED_NOTIFIABLE_TYPES[notifiableType].url + notifiableId;
  };

  const getTaskableUrl = (row) => {
    if (row.notifiable) {
      return getResourceUrl(
        row.notifiable.taskable.name ? PROJECT_TYPE : INVOICE_TYPE,
        row.notifiable.taskable.id
      );
    }
    return "#";
  };

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

  const handleDelete = async (id) => {
    try {
      await destroy(id);
      setSuccessSB(true);
      setInfoSB("Notificacion eliminada correctamente");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al eliminar la notificacion");
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

  const handleArchive = async (id, isArchived = true) => {
    try {
      await archiveMany({
        notification_ids: [id],
        is_archived: Number(isArchived),
      });
      setSuccessSB(true);
      setInfoSB("Notificacion archivada correctamente");
    } catch (error) {
      console.error(error);
      setErrorSB(true);
      setInfoSB("Error al marcar la notificacion como archivada");
    }
  };

  const handleArchiveMultiple = async (isArchived = true) => {
    setIsUpdating(true);
    try {
      await archiveMany({
        notification_ids: selectedNotificationIds,
        is_archived: Number(isArchived),
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

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={() => handleFilterIsSeen(true)}>Vistas</MenuItem>
      <MenuItem onClick={() => handleFilterIsSeen(false)}>No vistas</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={() => removeIsSeenFilter()}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remover Filtro
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  const columns = [
    {
      Header: "#",
      accessor: "id",
      width: "5%",
    },
    {
      Header: "Nombre",
      accessor: "title",
      width: "20%",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={2} mt={1}>
          {row.original.notifiableId != 0 &&
          row.original.notifiableType.length > 0 ? (
            <Link
              target="_blank"
              href={getResourceUrl(
                row.original.notifiableType,
                row.original.notifiableId
              )}
              aria-disabled={row.original.notifiableId == 0}
              tabIndex={row.original.notifiableId == 0 ? -1 : 0}
              style={{
                pointerEvents: row.original.notifiableId == 0 ? "none" : "null",
              }}
            >
              <MDTypography variant="body2" fontWeight="medium" color="link">
                {row.original.title}
              </MDTypography>
            </Link>
          ) : (
            <MDTypography variant="body2" fontWeight="medium" color="text">
              {row.original.title}
            </MDTypography>
          )}
          <MDBadge
            variant="contained"
            color={getPriorityColor(row.original?.priority?.label)}
            size="md"
            badgeContent={row.original?.priority?.label}
          />
        </MDBox>
      ),
    },
    {
      Header: "Descripción",
      width: "30%",
      accessor: "body",
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontWeight="medium">
          {row.original.body}
        </MDTypography>
      ),
    },
    {
      Header: "Creado por",
      accessor: "creator",
      Cell: ({ row }) => (
        <MDTypography variant="body3" fontWeight="medium" color="text">
          {row.original.creator?.name}
        </MDTypography>
      ),
    },
    {
      Header: "Caso",
      accessor: "case",
      width: "15%",
      Cell: ({ row }) => (
        <Link href={getTaskableUrl(row.original)} target="_blank">
          <MDTypography variant="body3" fontWeight="medium" color="link">
            {row.original.notifiable
              ? row.original.notifiable.taskable
                ? row.original.notifiable.taskable.name
                : `#${row.original.notifiable.number}`
              : ""}
          </MDTypography>
        </Link>
      ),
    },
    {
      Header: "Fecha de envio",
      accessor: "created_at",
      Cell: ({ row }) => {
        const notificationDate = moment(row.original.createdAt);
        const isToday = notificationDate.isSame(moment(), "day");

        return (
          <Tooltip title={notificationDate.format("LLL")}>
            <MDTypography variant="body3" sx={{ ml: 1 }}>
              {isToday
                ? notificationDate.locale("es").fromNow()
                : notificationDate.format("LLL")}
            </MDTypography>
          </Tooltip>
        );
      },
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ row }) => (
        <MDBox display="flex" mx={1} gap={2}>
          {row.original.isSeen ? (
            <Tooltip title="marcar como no leido" placement="top">
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
            </Tooltip>
          ) : (
            <Tooltip title="marcar como leido" placement="top">
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
            </Tooltip>
          )}
          {row.original.isArchived ? (
            <Tooltip title="Desarchivar" placement="top">
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <UnarchiveIcon
                  sx={{ cursor: "pointer" }}
                  fontSize="medium"
                  color="dark"
                  onClick={() => handleArchive(row.original.id, false)}
                />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Archivar" placement="top">
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ArchiveIcon
                  sx={{ cursor: "pointer" }}
                  fontSize="medium"
                  color="dark"
                  onClick={() => handleArchive(row.original.id, true)}
                />
              </button>
            </Tooltip>
          )}
          <Tooltip title="Eliminar" placement="top">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{
                cursor: "pointer",
                display: row.original.isBlocked ? "none" : "block",
              }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <>
      <Grid width="100%" display="flex" alignItems="center" container>
        <Grid
          display="flex"
          item
          xs={12}
          sm={6}
          justifyContent="start"
          gap={2}
          my={2}
        >
          <MDInput label="Buscar" onChange={handleSearch} />
          <MDButton
            variant="contained"
            color="dark"
            size="small"
            onClick={openMenu}
          >
            {selectedFilter ? selectedFilter : "Seleccionar filtro"}&nbsp;
            <Icon>keyboard_arrow_down</Icon>
          </MDButton>
          {renderMenu}
        </Grid>
        <Grid
          display="flex"
          item
          xs={12}
          sm={6}
          justifyContent="end"
          gap={2}
          my={2}
        >
          <MDButton
            color="info"
            variant="contained"
            onClick={() => handleMarkAsSeenMultiple()}
            disabled={
              isUpdating ||
              selectedNotificationIds.length === 0 ||
              allRowsAreSeen
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
            variant="contained"
            disabled={
              isUpdating ||
              selectedNotificationIds.length === 0 ||
              allRowsAreArchived
            }
            onClick={() => handleArchiveMultiple()}
          >
            Archivar
            <ArchiveIcon
              sx={{
                ml: 1,
                mb: 0.5,
              }}
            />
          </MDButton>
        </Grid>
      </Grid>
      <MDBox py={4} px={2}>
        <Tabs value={selectedTab} centered onChange={handleChange}>
          {TAB_TYPES.map((tab) => (
            <Tab key={tab.tabIndex} label={tab.label} />
          ))}
        </Tabs>
      </MDBox>
      <MDBox>
        {renderSnackbar()}
        {isLoading ? (
          <Loading count={table.rows?.length} />
        ) : (
          <DataTable
            table={table}
            showTotalEntries={false}
            isSorted={true}
            noEndBorder
            entriesPerPage={{
              defaultValue: 50,
              entries: [5, 10, 15, 20, 25, 50],
            }}
            isNotificable={true}
            canMultiSelect={true}
            setDeleteIds={setSelectedNotificationIds}
          />
        )}
      </MDBox>
    </>
  );
}
