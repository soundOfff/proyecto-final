import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import Select from "/components/Select";
import MDButton from "/components/MDButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import MDTypography from "/components/MDTypography";

export default function StaffForm({
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  staffData,
}) {
  const formField = useMemo(() => {
    return {
      staff: {
        name: "id",
        label: "Staff",
        errorMsg: "El staff es requerido",
      },
    };
  }, []);

  const validations = Yup.object().shape({
    [formField.staff.name]: Yup.number().required(formField.staff.errorMsg),
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [formField.staff.name]: "",
    },
    validationSchema: validations,
    onSubmit: (values, methods) => {
      setFieldValueExternal("staffs", [
        ...externalValues.staffs,
        {
          [formField.staff.name]: values[formField.staff.name],
        },
      ]);
      clearFields(methods);
    },
  });

  const clearFields = () => {
    setFieldValue(formField.staff.name, "");
  };

  return (
    <Grid container spacing={5} mb={5}>
      <Grid item xs={12}>
        <MDTypography variant="h6" fontWeight="bold"></MDTypography>
      </Grid>
      <Grid item xs={10}>
        <Select
          value={values[formField.staff.name]}
          options={staffData}
          optionLabel={(option) => option.name}
          fieldName={formField.staff.name}
          inputLabel={formField.staff.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item>
        <MDButton
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Agregar
        </MDButton>
      </Grid>
    </Grid>
  );
}
