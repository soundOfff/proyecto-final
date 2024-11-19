"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";

import { Autocomplete, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { getModelRelations } from "/actions/model-relations";
import form from "/app/request-templates/components/form/schemas/form";

export default function Table({ formData }) {
  const [models, setModels] = useState([]);

  const { values, setFieldValue } = formData;
  const { rows, model } = values;
  const { rows: rowsField } = form.formField;

  const handleRelationSelected = (e, relationsSelected, currentRowId) => {
    const newRows = rows.map((row) =>
      row.id === currentRowId ? { ...row, relationsSelected } : row
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
              ?.relationsSelected || ""
          }
          onChange={(e, relationsSelected) =>
            handleRelationSelected(e, relationsSelected, rowTable.original.id)
          }
          options={models}
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
    if (model) {
      getModelRelations({ model }).then((relations) => {
        setModels(relations);
      });
    }
  }, [model]);

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
