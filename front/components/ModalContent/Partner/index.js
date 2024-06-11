"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import { store as storePartner } from "/actions/partners";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import MDTypography from "/components/MDTypography";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import PersonForm from "./form";

export default function Index({ countries, handleClose }) {
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");

  const submitForm = async (values, actions) => {
    try {
      await storePartner(values);
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
      <MDBox mb={2}>
        <MDTypography variant="h6">Datos Personales</MDTypography>
      </MDBox>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
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
