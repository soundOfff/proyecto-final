"use client";

import { Autocomplete, Grid } from "@mui/material";
import Select from "/components/Select";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function PartnerForm({
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  partnerData,
}) {
  const formField = {
    partner: {
      name: "id",
      label: "Clientes",
      errorMsg: "El cliente es requerido",
    },
    role: {
      name: "role",
      label: "Rol",
      type: "text",
      errorMsg: "El rol es requerido",
    },
  };

  const validations = Yup.object().shape({
    [formField.partner.name]: Yup.number().required(formField.partner.errorMsg),
    [formField.role.name]: Yup.string().required(formField.role.errorMsg),
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [formField.partner.name]: "",
      [formField.role.name]: "",
    },
    validationSchema: validations,
    onSubmit: (values, methods) => {
      setFieldValueExternal("partners", [
        ...externalValues.partners,
        {
          id: values[formField.partner.name],
          role: values[formField.role.name],
        },
      ]);
      clearFields(methods);
    },
  });

  const clearFields = (methods) => {
    setFieldValue(formField.partner.name, "");
    setFieldValue(formField.role.name, "");
    methods.resetForm();
  };

  const roles = ["Demandante", "Demandado", "Persona responsable"];

  return (
    <>
      <Grid item xs={12}>
        <MDTypography variant="h6" fontWeight="bold">
          Personas Relacionadas
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[formField.partner.name]}
          options={partnerData}
          optionLabel={(option) => option.name}
          fieldName={formField.partner.name}
          inputLabel={formField.partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
          disablePortal
          id="role-select"
          options={roles}
          onChange={(event, newValue) => {
            setFieldValue(formField.role.name, newValue);
          }}
          value={values[formField.role.name]}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={formField.role.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(
                errors[formField.role.name] && touched[formField.role.name]
              )}
              helperText={
                touched[formField.role.name] && errors[formField.role.name]
              }
              sx={{ width: "100%" }}
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
            <ErrorMessage name={formField.role.name} />
          </MDTypography>
        </MDBox>
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
    </>
  );
}
