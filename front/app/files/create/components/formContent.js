"use client";

import MDDropzone from "/components/MDDropzone";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import Select from "/components/Select";
import form from "./schemas/form";
import { FILEABLE_TYPES } from "/utils/constants/fileableTypes";
import { ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { getAll as getAllProjects } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllExpenses } from "/actions/expenses";

export default function FormContent({ values, setFieldValue }) {
  const { formField } = form;
  const { file: fileField, fileableType, fileableId } = formField;
  const [relations, setRelations] = useState([]);

  const getOptionLabel = (option) => {
    if (option?.company) return option.company;
    if (option?.label) return option.label;
    if (option?.name) return option.name;
  };

  const getRelation = (fileableType) => {
    if (fileableType === "project") {
      getAllProjects().then((data) => setRelations(data));
    }
    if (fileableType === "customer") {
      getAllPartners().then((data) => setRelations(data));
    }
    if (fileableType === "expense") {
      getAllExpenses().then((data) => setRelations(data.data.expenses));
    }
  };

  useEffect(() => {
    if (values[fileableType.name]) {
      getRelation(values[fileableType.name]);
    }
  }, [values, fileableType]);

  const options = useMemo(
    () => ({
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 1,
      url: "nourl",
      autoProcessQueue: false,
    }),
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MDDropzone setFieldValue={setFieldValue} options={options} />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={fileField.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDBox>
          <Autocomplete
            value={
              FILEABLE_TYPES.find(
                (option) => option.value === values[fileableType.name]
              ) ?? null
            }
            onChange={(_, newFileableType) =>
              setFieldValue(fileableType.name, newFileableType.value)
            }
            options={FILEABLE_TYPES}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            getOptionLabel={(option) => option.label}
            key={(option) => option?.value}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label={fileableType.label}
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ ...params.inputProps }}
              />
            )}
          />
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              <ErrorMessage name={fileableType.name} />
            </MDTypography>
          </MDBox>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        {relations.length > 0 && (
          <Select
            value={values[fileableId.name]}
            options={relations}
            optionLabel={(option) => getOptionLabel(option)}
            fieldName={fileableId.name}
            inputLabel={fileableId.label}
            setFieldValue={setFieldValue}
          />
        )}
      </Grid>
    </Grid>
  );
}