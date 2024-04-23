"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Table from "./table";
import { useEffect, useState } from "react";
import { useDataProvider } from "/providers/DataProvider";
import { getAll } from "/actions/payments";
import { Card } from "@mui/material";

export default function Payments() {
  const { invoice } = useDataProvider();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getAll({
      "filter[invoice_id]": invoice.id,
      include: ["invoice", "paymentMethod"],
    }).then((data) => setPayments(data.data.payments));
  }, [invoice]);

  return (
    <Card>
      <MDBox p={5}>
        <MDBox display="flex" justifyContent="end" my={3}>
          <MDButton variant="contained" color="dark">
            Nuevo Cobro
          </MDButton>
        </MDBox>
        <Table rows={payments} />
      </MDBox>
    </Card>
  );
}
