"use client";

import { useEffect, useState } from "react";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { getAll as getAllExpenses } from "/actions/expenses";
import Table from "./components/table";

export default function AttachExpenses({ formData }) {
  const [expenses, setExpenses] = useState([]);
  const { values, formField, setFieldValue } = formData;

  useEffect(() => {
    const filters = { "filter[is_generic]": true };
    getAllExpenses(filters).then((response) => {
      setExpenses(response.data.expenses);
    });
  }, []);

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="medium">
        Agregar Gastos
      </MDTypography>
      <Table rows={expenses} formData={formData} />
    </MDBox>
  );
}
