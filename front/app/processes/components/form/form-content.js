"use client";

import { Autocomplete, Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import form from "./schemas/form";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import StaffForm from "./staff-form";
import StaffList from "./staff-list";

export default function First({
  values,
  errors,
  touched,
  setFieldValue,
  projectServiceTypes,
  process,
  processes,
  staffData,
}) {
  const {
    formField: {
      description,
      name,
      stepQuantity,
      projectServiceType,
      forks,
      staffs,
    },
  } = form;
  const [forksOptions, setForksOptions] = useState([]);

  const staffsSelected = values[staffs.name].map((staff) => ({
    id: staff.id,
    name: staffData.find((s) => s.id == staff.id).name,
  }));

  useEffect(() => {
    if (values.project_service_type_id) {
      setForksOptions(
        processes.filter(
          (p) =>
            p.projectServiceTypeId == values.project_service_type_id &&
            values.forks.find((f) => f.id == p.id) == undefined &&
            p.id != process?.id
        )
      );
    }
  }, [values.project_service_type_id, processes, process?.id]);

  useEffect(() => {
    if (process) {
      setFieldValue(name.name, process.name || "");
      setFieldValue(description.name, process.description || "");
      setFieldValue(stepQuantity.name, process.stepQuantity || "");
      setFieldValue(
        projectServiceType.name,
        process.projectServiceType?.id || ""
      );
      setFieldValue(forks.name, process.forks || "");
      setFieldValue(staffs.name, process.toNotify || "");
    }
  }, [
    process,
    setFieldValue,
    name,
    description,
    stepQuantity,
    projectServiceType,
    forks,
    staffs,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormField
          value={values[name.name]}
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          value={values[description.name]}
          name={description.name}
          label={description.label}
          type={description.type}
          placeholder={description.placeholder}
          error={errors[description.name] && touched[description.name]}
          success={
            values[description.name]?.length > 0 && !errors[description.name]
          }
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[stepQuantity.name]}
          name={stepQuantity.name}
          label={stepQuantity.label}
          type={stepQuantity.type}
          placeholder={stepQuantity.placeholder}
          error={errors[stepQuantity.name] && touched[stepQuantity.name]}
          success={
            values[stepQuantity.name]?.length > 0 && !errors[stepQuantity.name]
          }
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[projectServiceType.name]}
          options={projectServiceTypes}
          optionLabel={(option) => option.label}
          fieldName={projectServiceType.name}
          inputLabel={projectServiceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          value={values[forks.name]}
          onChange={(e, forksSelected) =>
            setFieldValue(forks.name, forksSelected)
          }
          options={forksOptions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={forks.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
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
            <ErrorMessage name={forks.name} />
          </MDTypography>
        </MDBox>
      </Grid>

      <Grid item xs={12}>
        <MDTypography variant="h6" fontWeight="bold" mt={2}>
          Notificar a
        </MDTypography>
        <StaffForm
          setFieldValue={setFieldValue}
          values={values}
          staffData={staffData}
        />
      </Grid>

      <Grid item xs={12}>
        <StaffList
          rows={staffsSelected}
          setFieldValue={setFieldValue}
          staffsField={staffs}
          values={values}
        />
      </Grid>
    </Grid>
  );
}
