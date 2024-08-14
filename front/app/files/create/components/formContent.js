"use client";

import MDDropzone from "/components/MDDropzone";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import Select from "/components/Select";
import form from "./schemas/form";
import {
  FILEABLE_TYPES,
  TASK_FILEABLE_TYPE,
  PROJECT_FILEABLE_TYPE,
  EXPENSE_FILEABLE_TYPE,
  PARTNER_FILEABLE_TYPE,
} from "/utils/constants/fileableTypes";
import { ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { getAll as getAllProjects } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllExpenses } from "/actions/expenses";
import { getAll as getAllTasks } from "/actions/tasks";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { useSearchParams } from "next/navigation";

export default function FormContent({ values, setFieldValue, errors }) {
  const { formField } = form;
  const { file: fileField, fileableType, fileableId, path, name } = formField;
  const [relations, setRelations] = useState([]);
  const searchParams = useSearchParams();

  const getOptionLabel = (option) => {
    if (option?.company) return option.company;
    if (option?.label) return option.label;
    if (option?.name) return option.name;
  };

  const getRelation = (fileableType) => {
    if (fileableType === PROJECT_FILEABLE_TYPE) {
      getAllProjects().then((data) => setRelations(data));
    }
    if (fileableType === PARTNER_FILEABLE_TYPE) {
      getAllPartners().then((data) => setRelations(data));
    }
    if (fileableType === EXPENSE_FILEABLE_TYPE) {
      getAllExpenses().then((data) => setRelations(data.data.expenses));
    }
    if (fileableType === TASK_FILEABLE_TYPE) {
      getAllTasks().then((data) => setRelations(data.data.tasks));
    }
  };

  useEffect(() => {
    if (values[fileableType.name]) {
      getRelation(values[fileableType.name]);
      setFieldValue(path.name, `${values[fileableType.name]}/`);
    }
  }, [values, fileableType, setFieldValue, path.name]);

  useEffect(() => {
    if (!values[fileableType.name]) {
      if (searchParams.get("projectId")) {
        setFieldValue(fileableType.name, PROJECT_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("projectId")));
      }
      if (searchParams.get("partnerId")) {
        setFieldValue(fileableType.name, PARTNER_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("partnerId")));
      }
      if (searchParams.get("expenseId")) {
        setFieldValue(fileableType.name, EXPENSE_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("expenseId")));
      }
      if (searchParams.get("taskId")) {
        setFieldValue(fileableType.name, TASK_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("taskId")));
      }
    }
  }, [searchParams, fileableId, fileableType, setFieldValue, values]);

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
      <Grid item xs={12} mt={2}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder="Nombre del archivo"
          value={values[name.name]}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
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
              setFieldValue(fileableType.name, newFileableType?.value ?? "")
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
                inputProps={{
                  ...params.inputProps,
                  style: { textTransform: "uppercase" },
                }}
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
