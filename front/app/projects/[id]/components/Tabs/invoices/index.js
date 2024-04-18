"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/invoices";
import Table from "./components/table";

export default function Invoices({ project }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      include: ["project", "partner"],
    }).then((data) => setInvoices(data.data.invoices));
  }, [project]);

  return <Table rows={invoices} />;
}
