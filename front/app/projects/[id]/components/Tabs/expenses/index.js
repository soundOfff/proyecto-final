"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/expenses";
import Table from "./components/table";

export default function Expenses({ project }) {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      include: ["category", "project", "invoice", "partner", "files"],
    }).then((data) => setExpenses(data.data.expenses));
  }, [project]);

  return <Table rows={expenses} />;
}
