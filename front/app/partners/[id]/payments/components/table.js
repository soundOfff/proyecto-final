"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";
import ModalContent from "./modal/content";
import Tooltip from "@mui/material/Tooltip";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteRow from "/components/DeleteRow";

import useDeleteRow from "/hooks/useDeleteRow";
import { destroy } from "/actions/payments";
import { useState } from "react";

export default function Table({ rows }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
      Header: "Cobro nº",
      accessor: "id",
      width: "10%",
    },
    {
      Header: "Facturas relacionadas",
      accessor: "invoces",
      Cell: ({ row }) => (
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          {row.original.invoices && row.original.invoices.length > 0 ? (
            row.original.invoices.map((invoice) => (
              <MDBox key={invoice.id}>
                <Link href={`/invoices/${invoice.id}`}>
                  <MDTypography variant="button" fontWeight="regular">
                    {invoice.number}
                  </MDTypography>
                </Link>
              </MDBox>
            ))
          ) : (
            <MDTypography variant="button" fontWeight="regular" color="text">
              Sin facturas relacionadas
            </MDTypography>
          )}
        </MDBox>
      ),
    },
    {
      Header: "Modo de cobro",
      accessor: "paymentMethod.name",
      Cell: ({ row }) => (
        <MDTypography
          variant="button"
          display="flex"
          justifyContent="center"
          fontWeight="regular"
        >
          {row.original.paymentMethod.name.toUpperCase()}
        </MDTypography>
      ),
      width: "10%",
    },
    {
      Header: "ID de la transacción",
      accessor: "transactionId",
    },
    {
      Header: "Cliente",
      accessor: "partner.name",
      Cell: ({ row }) => (
        <Link href={`/partners/${row.original.partner.id}`}>
          <MDTypography variant="button" fontWeight="regular" color="dark">
            {row.original.partner.company}
          </MDTypography>
        </Link>
      ),
    },
    {
      Header: "Monto",
      accessor: "amount",
    },
    {
      Header: "Fecha",
      accessor: "createdAt",
    },
    {
      id: "acciones",
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex" alignContent="center">
          <Tooltip title="Asignar un pago">
            <PaymentsOutlinedIcon
              color="info"
              fontSize="medium"
              onClick={() => handleOpenModal(row.original)}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Eliminar un pago">
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

  const handleOpenModal = (payment) => {
    setIsModalOpen(true);
    setSelectedRow(payment);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const table = { columns, rows };
  return (
    <MDBox>
      <MDBox display="flex" justifyContent="end" my={3}>
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <ModalContent setOpenModal={setIsModalOpen} payment={selectedRow} />
          </Modal>
        )}
      </MDBox>
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        entriesPerPage={false}
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
