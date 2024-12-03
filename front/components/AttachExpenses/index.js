"use client";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import Table from "./components/table";

import { useEffect, useState } from "react";
import { getAll as getAllExpenses } from "/actions/expenses";
import { LINE_ITEM_TYPES } from "/utils/constants/lineItemTypes";

export default function AttachExpenses({ formData, projectId }) {
  const {
    values: externalValues,
    formField,
    setFieldValue: setFieldValueExternal,
  } = formData;
  const { items } = formField;
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const handleAddItems = () => {
    const mappedExpenses = selectedExpenses
      .map((expense) => {
        if (
          externalValues["items"].some(
            (item) =>
              item.description === (expense.name || `Gasto #${expense.id}`)
          )
        ) {
          return null;
        }
        return {
          description: expense.name ?? `Gasto #${expense.id}`,
          rate: expense.amount,
          long_description: expense.note,
          line_item_type_id: LINE_ITEM_TYPES.EXPENSE,
          quantity: 1,
          taxes: [],
          discount: "",
          expense_id: expense.id,
          unit: "",
        };
      })
      .filter(Boolean);
    setFieldValueExternal(items.name, [
      ...externalValues.items,
      ...mappedExpenses,
    ]);
  };

  useEffect(() => {
    const filters = {
      "filter[is_generic]": true,
      "filter[project_id]": projectId,
      "filter[not_in_line_item]": true,
    };
    getAllExpenses(filters).then((response) => {
      setExpenses(response.data.expenses);
    });
  }, [projectId]);

  return (
    <MDBox>
      <MDBox
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h5" fontWeight="medium">
          Agregar Gastos
        </MDTypography>
        <MDButton
          onClick={handleAddItems}
          type="button"
          size="small"
          disabled={expenses.length === 0}
          color="success"
          sx={{ mt: 1.5 }}
        >
          Agregar como item
        </MDButton>
      </MDBox>
      <Table
        rows={expenses}
        formData={formData}
        setSelectedExpenses={setSelectedExpenses}
      />
    </MDBox>
  );
}
