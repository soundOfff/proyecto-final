"use client";

import Table from "./table";
import { useEffect } from "react";
import { useDataProvider } from "/providers/DataProvider";
import { getAll } from "/actions/payments";

export default function Payments() {
  const { invoice } = useDataProvider();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getAll({ invoiceId: invoice.id }).then((data) =>
      setPayments(data.data.payments)
    );
  }, [invoice]);

  return <Table rows={payments} />;
}
