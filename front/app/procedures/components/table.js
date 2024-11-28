"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { destroy } from "/actions/procedures";
import { editSteps } from "/actions/procedures";
import { useMaterialUIController } from "/context";
import update from "immutability-helper";
import useDeleteRow from "/hooks/useDeleteRow";
import MDTypography from "/components/MDTypography";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DeleteRow from "/components/DeleteRow";
import { Tooltip } from "@mui/material";
import Switch from "@mui/material/Switch";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { show } from "/actions/processes";
import SlackShare from "/components/SlackShare";

export default function Procedures({ procedures, actionTypes, processId }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [records, setRecords] = useState(procedures);
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!processId) return;

    const fetchProcess = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await show(processId, {});
        setProcess(data);
      } catch (error) {
        setError("Error fetching process data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProcess();
  }, [processId]);

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                color: "#4caf50",
                "&:hover": {
                  backgroundColor: alpha("#4caf50", 0.08),
                },
              },
            },
          },
        },
      },
    },
  });

  const getActionsColumns = () => {
    return actionTypes.map((actionType) => {
      return {
        Header: actionType.label,
        accessor: actionType.name,
        Cell: ({ row }) => {
          return (
            <MDBox display="flex" justifyContent="center" width="100%">
              <ThemeProvider theme={theme}>
                <Switch
                  name={actionType.name}
                  disabled={true}
                  checked={row.original.actions.some(
                    (action) => action.type.id === actionType.id
                  )}
                />
              </ThemeProvider>
            </MDBox>
          );
        },
      };
    });
  };

  useEffect(() => {
    setRecords(procedures);
  }, [procedures]);

  const columns = [
    {
      Header: "N° de Paso",
      accessor: "stepNumber",
      width: 100,
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Autor",
      accessor: "author",
      Cell: ({ value }) => value && value.name,
    },
    ...getActionsColumns(),
    {
      id: "acciones",
      Header: "",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Editar Procedimiento">
            <Link
              href={`/procedures/${row.original.id}?processId=${processId}`}
            >
              <EditIcon color="info" fontSize="medium" />
            </Link>
          </Tooltip>
          <Tooltip title="Eliminar Procedimiento">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    const updatedRecords = update(records, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    });

    setRecords(
      updatedRecords.map((record, index) => ({
        ...record,
        stepNumber: index + 1,
      }))
    );
  };

  useEffect(() => {
    if (records.length > 0) {
      setTimeout(() => {
        editSteps({ procedures: records });
      }, 1000);
    }
  }, [records]);

  const table = { columns, rows: records };

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
        mx={5}
      >
        <MDBox display="flex" alignItems="center">
          {loading && (
            <MDTypography variant="h4" color="textSecondary">
              Cargando...
            </MDTypography>
          )}
          {error && (
            <MDTypography variant="h4" color="error">
              {error}
            </MDTypography>
          )}
          {process && (
            <MDTypography variant="h4" color="textPrimary">
              {process.name}
            </MDTypography>
          )}
        </MDBox>
        <MDBox display="flex">
          <SlackShare modelId={processId} modelType="Process" />
          <Link
            href={{ pathname: "/procedures/create", query: { processId } }}
            style={{ marginLeft: "1rem" }}
          >
            <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
              Agregar Procedimiento
            </MDButton>
          </Link>
        </MDBox>
      </MDBox>
      <MDBox mx={5}>
        <DataTable
          table={table}
          entriesPerPage={{ defaultValue: 50 }}
          showTotalEntries={false}
          moveRow={moveRow}
          isSorted={false}
          noEndBorder
        />
      </MDBox>
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </>
  );
}
