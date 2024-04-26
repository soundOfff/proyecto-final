"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Table from "./table";
import Modal from "/components/Modal";
import ModalContent from "./components/modal";
import { useEffect, useState } from "react";
import { useDataProvider } from "/providers/DataProvider";
import { getAll } from "/actions/payments";
import { Card } from "@mui/material";

export default function Payments() {
  const { invoice } = useDataProvider();
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAll({
      "filter[invoices]": [invoice.id],
      include: ["invoices", "paymentMethod"],
    }).then((data) => setPayments(data));
  }, [invoice]);

  return (
    <Card>
      <MDBox p={5}>
        <MDBox display="flex" justifyContent="end" my={3}>
          <MDButton
            variant="contained"
            color="dark"
            onClick={() => setIsModalOpen(true)}
          >
            Asignar pago
          </MDButton>
          {isModalOpen && (
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalContent
                payment={payment}
                setOpenModal={() => setIsModalOpen(true)}
              />
            </Modal>
          )}
        </MDBox>
        <Table rows={payments} />
      </MDBox>
    </Card>
  );
}
