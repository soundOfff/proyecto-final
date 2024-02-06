"use client";

import { show } from "/actions/expenses";
import { useEffect, useState } from "react";
import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Modal from "/components/Modal";
import ModalContent from "./modal-content";
import Link from "next/link";
import Image from "next/image";
import ModalContentForm from "../../../components/ModalContent/Task/form";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [expenseIdShow, setExpenseIdShow] = useState(0);
  const [expense, setExpense] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <Link
          href={`/tasks/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: "Fecha de inicio",
      accessor: "date_from",
    },
    {
      Header: "Fecha de vencimiento",
      accessor: "date_to",
    },
    {
      // TODO: make accessor works
      Header: "Asignar a",
      accessor: "",
      Cell: ({ value, row }) => {
        return row.original.project ? (
          <Link
            href={`/admin/profile/${row.original.project?.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {row.original.project?.user?.first_name}
            {row.original.project?.user?.profile_picture?.url && (
              <Image
                src={row.original.project?.user?.profile_picture?.url}
                alt="user"
                width={30}
                height={30}
              />
            )}
          </Link>
        ) : null;
      },
    },
    {
      Header: "Etiquetas",
      accessor: "labels",
      Cell: ({ value }) =>
        value ? (
          <Link href={`/partners/${value.id}/profile`}>
            {value.map((label) => (
              <MDBox
                key={label.id}
                display="inline-block"
                mr={1}
                color="info"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {label.name}
              </MDBox>
            ))}
          </Link>
        ) : null,
    },
    {
      Header: "Prioridad",
      Cell: ({ row }) => (
        <Select
          value={0}
          options={["Alta", "Media", "Baja"]}
          optionLabel={(option) => option}
        />
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
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
        {open && (
          <Modal open={open} onClose={handleClose} width="30%">
            <ModalContentForm taxes={[]} groupIds={[]} />
          </Modal>
        )}
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
