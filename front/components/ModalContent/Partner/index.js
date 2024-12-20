"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import MDTypography from "/components/MDTypography";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import notRequiredValidations from "./schemas/notRequiredValidations";
import PersonForm from "./form";
import { store as storePartner } from "/actions/partners";

export default function Index({ countries, handleClose, setFieldValue }) {
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const [isRequired, setIsRequired] = useState(true);

  const submitForm = async (values, actions) => {
    try {
      const partner = await storePartner(values);
      setFieldValue("related_partner_id", partner.id);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = async (values, actions) => {
    await submitForm(values, actions);
    handleClose();
  };

  return (
    <MDBox py={2}>
      <MDBox
        color="white"
        bgColor="dark"
        variant="gradient"
        borderRadius="lg"
        shadow="lg"
        opacity={1}
        mb={5}
        p={2}
      >
        Nueva persona relacionada
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={2}>
        <MDTypography variant="h6">Datos Personales</MDTypography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
              />
            }
            label="Campos Requeridos"
          />
        </FormGroup>
      </MDBox>
      <Formik
        initialValues={initialValues}
        validationSchema={isRequired ? validations : notRequiredValidations}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Form autoComplete="off">
            <MDSnackbar
              color="error"
              icon="warning"
              title="Error"
              content={errorMsg}
              open={errorSB}
              onClose={() => setErrorSB(false)}
              close={() => setErrorSB(false)}
              bgWhite
            />
            <PersonForm
              errors={errors}
              values={values}
              touched={touched}
              setFieldValue={setFieldValue}
              countries={countries}
            />
            <Grid item xs={12} mt={2}>
              <MDBox display="flex" justifyContent="end" gap={2}>
                <MDButton
                  variant="gradient"
                  color="light"
                  onClick={handleClose}
                >
                  Cancelar
                </MDButton>
                <MDButton color="dark" type="submit">
                  Guardar
                </MDButton>
              </MDBox>
            </Grid>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}
