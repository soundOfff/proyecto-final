"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/expenses";
import Table from "./components/table";
import Loader from "../components/loader";
import { useDataProvider } from "/providers/DataProvider";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useDataProvider();

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
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

  return isLoading ? <Loader /> : <Table rows={expenses} project={project} />;
}
