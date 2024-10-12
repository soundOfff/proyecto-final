"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/expenses";
import Table from "./components/table";
import Loader from "../components/loader";
import { useDataProvider } from "/providers/DataProvider";
import { useSearchParams } from "next/navigation";
import { Grid } from "@mui/material";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useDataProvider();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const expensesDateFilter =
    dateFrom || dateTo ? { "filter[date]": `${dateFrom},${dateTo}` } : null;
  const expensesSearchFilter = search ? { "filter[search]": search } : null;

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      ...expensesDateFilter,
      ...expensesSearchFilter,
      include: [
        "category",
        "project",
        "invoice",
        "partner",
        "estimate",
        "files",
      ],
    }).then((data) => {
      setExpenses(data.data.expenses);
      setIsLoading(false);
    });
  }, [project]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} py={1} mt={4}>
        <Table rows={expenses} project={project} />
      </Grid>
    </Grid>
  );
}
