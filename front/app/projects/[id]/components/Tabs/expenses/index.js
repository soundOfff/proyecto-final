"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/expenses";
import Table from "./components/table";
import Loader from "../components/loader";

export default function Expenses({ project }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      include: ["category", "project", "invoice", "partner", "files"],
    }).then((data) => {
      setExpenses(data.data.expenses);
      setIsLoading(false);
    });
  }, [project]);

  return isLoading ? <Loader /> : <Table rows={expenses} />;
}
