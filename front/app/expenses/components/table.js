"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Modal from "/components/Modal";
import ModalContent from "./modal-content";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";
import { show } from "/actions/expenses";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { destroy } from "../../../actions/expenses";
import { destroy as destroyFile } from "../../../actions/files";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [expenseIdShow, setExpenseIdShow] = useState(0);
  const [expense, setExpense] = useState(null);
  const [open, setOpen] = useState(false);

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
      Header: "Caso",
      accessor: "project.name",
      Cell: ({ value, row }) => {
        return row.original.project ? (
          <Link
            href={`/projects/${row.original.project?.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {row.original.project.name}
          </Link>
        ) : null;
      },
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
                <DescriptionOutlined fontSize="medium" color="dark" />
                <Link href={file.publicUrl}>
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="dark"
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
      Cell: ({ row }) => (
        <>
          <Tooltip title="Vista Rápida">
            <FlashOnIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setExpenseIdShow(row.original.id);
                setOpen(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Eliminar gasto">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                destroy(row.original.id);
              }}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </>
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
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/expenses/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Gasto
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
    </MDBox>
  );
}
