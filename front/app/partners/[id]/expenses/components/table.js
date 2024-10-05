"use client";

import DataTable from "/examples/Tables/DataTable";
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
import { FlashOnOutlined } from "@mui/icons-material";
import { useParams } from "next/navigation";

export default function Table({ rows }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [expenseIdShow, setExpenseIdShow] = useState(0);
  const [expense, setExpense] = useState(null);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

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
      Header: "Factura",
      accessor: "invoice.id",
    },
    {
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <Tooltip title="Vista Rápida">
          <FlashOnOutlined
            color="info"
            fontSize="medium"
            onClick={() => {
              setExpenseIdShow(row.original.id);
              setOpen(true);
            }}
            sx={{ mr: 3, cursor: "pointer" }}
          />
        </Tooltip>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      {expense && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalContent expense={expense} />
        </Modal>
      )}
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href={`/expenses/create?partnerId=${id}`}>
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Gasto
          </MDButton>
        </Link>
      </MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
