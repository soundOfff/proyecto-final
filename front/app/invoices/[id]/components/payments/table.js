"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Modal from "/components/Modal";
import ModalContent from "../payments/components/modal/content";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";
import { destroy } from "/actions/payments";
import numberFormat from "/utils/numberFormat";
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

  const handleOpenModal = (payment) => {
    setIsModalOpen(true);
    setSelectedRow(payment);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    {
      id: "id",
      Header: "Payment ID",
      accessor: "id",
    },
    {
      id: "paymentMethod",
      Header: "Modo de Cobro",
      Cell: ({ row }) => row.original.paymentMethod.label,
    },
    {
      id: "date",
      Header: "Fecha",
      accessor: "date",
    },
    {
      id: "amount",
      Header: "Importe",
      accessor: "amount",
      Cell: ({ row }) => <>$ {numberFormat(row.original.parcial_amount)}</>,
    },
    {
      id: "acciones",
      Header: "Acciones",
      Cell: ({ row }) => (
        <>
          <Tooltip title="Eliminar Cobro">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Asignar un pago">
            <PaymentsOutlinedIcon
              color="info"
              fontSize="medium"
              onClick={() => handleOpenModal(row.original)}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  console.log(rows);
  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="end" my={3}>
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <ModalContent
              setOpenModal={handleOpenModal}
              payment={selectedRow}
            />
          </Modal>
        )}
      </MDBox>
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
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
