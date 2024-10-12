"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";
import ModalContent from "./modal-content";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";
import { show, destroy } from "/actions/expenses";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import { Grid, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EditIcon from "@mui/icons-material/Edit";
import { destroy as destroyFile } from "/actions/files";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import Filters from "./filters";

export default function Table({ rows, project }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [expenseIdShow, setExpenseIdShow] = useState(0);
  const [expense, setExpense] = useState(null);
  const [open, setOpen] = useState(false);
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
  const handleDeleteFile = async (fileId) => {
    await destroyFile(fileId);
  };

  useEffect(() => {
    const fetchExpense = async () => {
      setExpense(
        await show(expenseIdShow, {
          include: ["category", "project", "invoice", "partner"],
        })
      );
    };
    if (expenseIdShow) {
      fetchExpense();
    }
  }, [expenseIdShow]);

  const columns = [
    {
      Header: "Categoría",
      accessor: "category.name",
    },
    {
      Header: "Importe",
      accessor: "amount",
      Cell: ({ value }) => moneyFormat(value),
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <Link
          href={`/expenses/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Proforma",
      accessor: "estimate",
      Cell: ({ row }) => (
        <MDBox sx={{ textAlign: "center", mr: 4 }}>
          <Link href={`/estimates/${row.original.estimate?.id}`}>
            {row.original.estimate?.id}
          </Link>
        </MDBox>
      ),
    },
    {
      Header: "Cliente",
      accessor: "partner",
      Cell: ({ value }) =>
        value ? (
          <Link href={`/partners/${value.id}/profile`}>{value.company}</Link>
        ) : null,
    },
    {
      Header: "Factura",
      accessor: "invoice.id",
      Cell: ({ value }) => (
        <MDBox sx={{ textAlign: "center", mr: 4 }}>
          <Link href={`/estimates/${value}`}>{value}</Link>
        </MDBox>
      ),
    },
    {
      Header: "Archivos",
      accessor: "files",
      width: "20%",
      textAlign: "center",
      Cell: ({ row }) => {
        return (
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ gap: 1, width: "100%" }}
          >
            {row.original.files.map((file) => (
              <MDBox
                key={file.id}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="between"
                p={0.75}
                sx={{
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                  gap: 1,
                }}
              >
                <DescriptionOutlined fontSize="small" color="dark" />
                <Link href={file.publicUrl} target="_blank">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                    fontSize="small"
                  >
                    {file.subject.length > 10
                      ? file.subject.substring(0, 10) + "..."
                      : file.subject}
                  </MDTypography>
                </Link>
                <CancelIcon
                  color="error"
                  onClick={() => handleDeleteFile(file.id)}
                  sx={{ cursor: "pointer" }}
                />
              </MDBox>
            ))}
          </MDBox>
        );
      },
    },
    {
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Vista Rápida">
            <FlashOnIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setExpenseIdShow(row.original.id);
                setOpen(true);
              }}
              sx={{ mr: 1, cursor: "pointer" }}
            />
          </Tooltip>
          <Link
            href={{
              pathname: `/expenses/${row.original.id}/edit`,
              query: {
                source: `/projects/${project.id}?tab=expenses`,
              },
            }}
            sx={{ cursor: "pointer", color: "info", ml: 1 }}
          >
            <Tooltip title="Editar gasto" placement="top">
              <EditIcon fontSize="medium" color="warning" />
            </Tooltip>
          </Link>
          <Tooltip title="Eliminar gasto">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      {expense && (
        <Modal
          height="60%"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalContent expense={expense} />
        </Modal>
      )}
      <Grid container display="flex" justifyContent="center" mt={2} mb={6}>
        <Grid item xs={12} sm={8}>
          <Filters />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={2}
          >
            <Link
              href={{
                pathname: `/expenses/create`,
                query: {
                  projectId: project?.id,
                  partnerId: project?.billablePartner.id,
                  source: `/projects/${project.id}?tab=expenses`,
                },
              }}
            >
              <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
                Registrar Gasto
              </MDButton>
            </Link>
          </MDBox>
        </Grid>
      </Grid>
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
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
