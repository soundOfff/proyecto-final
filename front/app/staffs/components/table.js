"use client";
import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";
import { Link, Switch, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import moment from "moment";

import { destroy } from "/actions/staffs";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
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
      Header: "Nombre completo",
      accessor: "first_name",
      width: 200,
      Cell: ({ row }) => (
        <MDBox key={row.original.id} display="inline-block" mr={2}>
          {row.original.profileImage && (
            <MDAvatar
              src={row.original.profileImage}
              alt="profile-image"
              size="md"
              shadow="sm"
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                height: "2rem",
                width: "2rem",
              }}
            />
          )}
          <Link href={`/staffs/${row.original.id}`}>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="info"
              fontSize="small"
              mr={2}
            >
              {row.original.firstName} {row.original.lastName}
            </MDTypography>
          </Link>
        </MDBox>
      ),
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontSize="small">
          {row.original.email}
        </MDTypography>
      ),
    },
    {
      Header: "Cargo",
      accessor: "isAdmin",
    },
    {
      Header: "Ultimo acceso",
      accessor: "last_login",
      Cell: ({ row }) => {
        return (
          <MDTypography variant="caption">
            {row.original.lastLogin
              ? moment(row.original.lastLogin).format("DD/MM/YYYY HH:mm")
              : "Nunca"}
          </MDTypography>
        );
      },
    },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => {
        const label = { inputProps: { "aria-label": "Is active switch" } };
        return <Switch {...label} checked={Boolean(value)} />;
      },
    },
    {
      Header: "Acciones",
      accessor: "actions",
      noSortBy: true,
      Cell: ({ row }) =>
        false && (
          <Tooltip title="Eliminar un miembro">
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
        ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/staffs/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Crear nuevo miembro del equipo
          </MDButton>
        </Link>
      </MDBox>
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
