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
  staffData,
}) {
  const {
    formField: { description, name, projectServiceType, staffs },
  } = form;

  const staffsSelected = values[staffs.name].map((staff) => ({
    id: staff.id,
    name: staffData.find((s) => s.id == staff.id).name,
  }));

  useEffect(() => {
    if (process) {
      setFieldValue(name.name, process.name || "");
      setFieldValue(description.name, process.description || "");
      setFieldValue(
        projectServiceType.name,
        process.projectServiceType?.id || ""
      );
      setFieldValue(staffs.name, process.toNotify || "");
    }
  }, [process, setFieldValue, name, description, projectServiceType, staffs]);

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
      <Grid item xs={12}>
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
