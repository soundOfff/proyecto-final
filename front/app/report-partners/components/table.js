"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import { Link, Switch } from "@mui/material";
import { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
//PaymentsOutlinedIcon
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Modal from "/components/Modal";
import ModalContent from "./modal/content";

export default function Table({ rows, meta }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { Header: "#", accessor: "id" },
    {
      Header: "Razón Social",
      accessor: "company",
      Cell: ({ row }) =>
        row.original.name ? (
          <Link href={`partners/${row.original.id}/profile`} color="info">
            {row.original.name}
          </Link>
        ) : (
          <Link href={`partners/${row.original.id}/profile`} color="info">
            {row.original.company}
          </Link>
        ),
    },
    {
      id: "contactName",
      Header: "Contacto Principal",
      accessor: "contacts",
      Cell: ({ value }) => {
        return value && value[0]
          ? `${value[0].firstName} ${value[0].lastName}`
          : null;
      },
    },
    {
      Header: "Pagado",
      accessor: "totalPaid",
      Cell: ({value}) => {
        return "$" + `${(value)}`
      }
    },
    { 
      Header: "Deuda Total", 
      accessor: "financial",
      Cell: ({row}) => {
          return "$" + `${(row.original.totalBilledCost - row.original.totalPaid)}`
      }
    },
    {
      id: "acciones",
      Header: "Acciones",
      accessor:"id",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex" alignContent="center">
          <Tooltip title="Proyectos">
            <PaymentsOutlinedIcon
              color="info"
              fontSize="medium"
              onClick={() => handleOpenModal(row)}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const handleOpenModal = (partner) => {
    setIsModalOpen(true);
    setSelectedRow(partner.original);
    console.log(partner.original);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const table = { columns, rows };

  return (
    <MDBox>
      {isModalOpen && (
        <MDBox display="flex" justifyContent="end" my={3}>
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <ModalContent partner={selectedRow} />
            
          </Modal>
        </MDBox>
      )}  
      <DataTable
        table={table}
        meta={meta}
        entriesPerPage={true}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
