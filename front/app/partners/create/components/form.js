"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import { store as storePartner } from "/actions/partners";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DetailForm from "./detail-form";
import InvoiceForm from "./invoice-form";
import Tabs from "./tabs";
import form from "../schemas/form";
import initialValues from "../schemas/initial-values";
import validations from "../schemas/validations";

export default function FormComponent({ consolidators, countries }) {
  const [tabIndex, setTabIndex] = useState(0);
  const { formId } = form;

  const submitForm = async (values, actions) => {
    await storePartner(values);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <MDBox py={5}>
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
            {tabIndex === 0 ? (
              <DetailForm
                {...{
                  consolidators,
                  countries,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                }}
              />
            ) : (
              <InvoiceForm
                {...{
                  countries,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                }}
              />
            )}
            <Grid item xs={12}>
              <MDBox display="flex" justifyContent="end">
                <MDButton color="dark" type="submit" disabled={isSubmitting}>
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
