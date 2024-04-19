"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/invoices";
import Table from "./components/table";
import { Skeleton } from "@mui/material";
import Loader from "../components/loader";

export default function Invoices({ project }) {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
