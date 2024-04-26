"use client";

import MDBox from "/components/MDBox";
import Table from "./table";
import { useEffect, useState } from "react";
import { useDataProvider } from "/providers/DataProvider";
import { show } from "/actions/invoices";
import { Card } from "@mui/material";

export default function Payments() {
  const { invoice } = useDataProvider();
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    show(invoice.id, {
      include: ["payments", "payments.paymentMethod"],
    }).then((data) => setPayments(data.payments));
  }, [invoice]);
  return (
    <Card>
      <MDBox p={5}>
        <Table rows={payments} />
      </MDBox>
    </Card>
  );
}
