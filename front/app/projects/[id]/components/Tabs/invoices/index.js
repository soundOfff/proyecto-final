"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/invoices";
import { useDataProvider } from "/providers/DataProvider";
import Table from "./components/table";
import Loader from "../components/loader";
import { useSearchParams } from "next/navigation";
import { Grid } from "@mui/material";
import Filters from "./components/filters";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useDataProvider();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const invoiceDateFilter =
    dateFrom || dateTo ? { "filter[date]": `${dateFrom},${dateTo}` } : null;
  const invoiceSearchFilter = search ? { "filter[search]": search } : null;

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      ...invoiceDateFilter,
      ...invoiceSearchFilter,
      include: ["project", "partner", "estimate"],
    }).then((data) => {
      setInvoices(data.data.invoices);
      setIsLoading(false);
    });
  }, [project]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Filters />
      </Grid>
      <Grid item xs={12} py={1} mt={4}>
        <Table rows={invoices} />
      </Grid>
    </Grid>
  );
}
