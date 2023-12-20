"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";
import ModalContent from "./modal-content";
import moneyFormat from "/utils/moneyFormat";
import { show } from "/actions/expenses";
import { useEffect, useState } from "react";

export default function Table({ rows }) {
  const [expenseIdShow, setExpenseIdShow] = useState(0);
  const [expense, setExpense] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      setExpense(
        await show(expenseIdShow, {
          include: ["category", "project", "invoice", "user.partners"],
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
        <MDTypography
          color="info"
          variant="button"
          onClick={() => {
            setExpenseIdShow(row.original.id);
            setOpen(true);
          }}
          sx={{ cursor: "pointer" }}
        >
          {row.original.name}
        </MDTypography>
      ),
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Caso",
      accessor: "project.name",
    },
    {
      Header: "Cliente",
      accessor: "user",
      Cell: ({ value }) =>
        value && value.partners ? value.partners[0].company : null,
    },
    {
      Header: "Factura",
      accessor: "invoice.id",
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
