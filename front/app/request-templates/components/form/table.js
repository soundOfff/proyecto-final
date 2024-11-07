"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";

import { Autocomplete, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { getTables } from "/actions/tables";
import { getTableFields } from "/actions/table-field";
import form from "/app/request-templates/components/form/schemas/form";

export default function Table({ formData }) {
  const [tables, setTables] = useState([]);

  const { values, setFieldValue } = formData;
  const { rows } = values;
  const { rows: rowsField } = form.formField;

  const handleTableSelected = async (e, tableSelected, currentRowId) => {
    const newRows = await Promise.all(
      rows.map(async (row) => {
        if (row.id === currentRowId) {
          const data = await getTableFields({ table: tableSelected });
          const fields = data.map((field) => field.field);

          return { ...row, tableSelected: tableSelected, fields: fields };
        }
        return row;
      })
    );

    setFieldValue(rowsField.name, newRows);
  };

  const handleFieldSelected = (e, fieldSelected, currentRowId) => {
    const newRows = rows.map((row) =>
      row.id === currentRowId ? { ...row, fieldSelected } : row
    );

    setFieldValue(rowsField.name, newRows);
  };

  const handleDelete = (currentRowId) => {
    setFieldValue(
      rowsField.name,
      rows.filter((row) => row.id !== currentRowId)
    );
  };

  const columns = [
    {
      Header: "Nombre del campo",
      accessor: "name",
    },
    {
      Header: "Tabla",
      accessor: "required",
      Cell: ({ row: rowTable }) => (
        <Autocomplete
          value={
            rows?.find((row) => row?.id === rowTable.original.id)
              ?.tableSelected || ""
          }
          onChange={(e, tableSelected) =>
            handleTableSelected(e, tableSelected, rowTable.original.id)
          }
          options={tables}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      ),
    },
    {
      Header: "Valor",
      accessor: "field",
      Cell: ({ row: rowTable }) => (
        <Autocomplete
          value={
            rows?.find((row) => row?.id === rowTable.original.id)
              ?.fieldSelected || ""
          }
          onChange={(e, fieldSelected) =>
            handleFieldSelected(e, fieldSelected, rowTable.original.id)
          }
          options={
            rows?.find((row) => row?.id === rowTable.original.id)?.fields || []
          }
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={2} justifyContent="center">
          <Icon
            fontSize="medium"
            color="error"
            onClick={() => handleDelete(row.original.id)}
          >
            delete
          </Icon>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  useEffect(() => {
    getTables().then((tables) => {
      setTables(tables);
    });
  }, []);

  return (
    <MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={false}
        noEndBorder
      />
    </MDBox>
  );
}
