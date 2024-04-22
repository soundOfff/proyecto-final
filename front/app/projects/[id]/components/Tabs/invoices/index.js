"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/invoices";
import { useDataProvider } from "/providers/DataProvider";
import Table from "./components/table";
import Loader from "../components/loader";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useDataProvider();

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      include: ["project", "partner"],
    }).then((data) => {
      setInvoices(data.data.invoices);
      setIsLoading(false);
    });
  }, [project]);

  return isLoading ? <Loader /> : <Table rows={invoices} />;
}
