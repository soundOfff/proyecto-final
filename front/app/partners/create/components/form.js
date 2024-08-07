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
import MDSnackbar from "/components/MDSnackbar";
import { useRouter } from "next/navigation";

export default function FormComponent({
  consolidators,
  notJuridicEntities,
  sections,
  industries,
  countries,
  partnerTypes,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isJuridic, setIsJuridic] = useState(true);
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();

  const submitForm = async (values, actions) => {
    try {
      await storePartner(values);
      router.push("/partners");
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const getCurrentValidation = () => {
    if (isJuridic) {
      return validations.juridical;
    } else {
      return validations.person;
    }
  };

  return (
    <MDBox py={5}>
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <Formik
        initialValues={initialValues}
        validationSchema={getCurrentValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
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
            {tabIndex === 0 ? (
              <DetailForm
                {...{
                  consolidators,
                  notJuridicEntities,
                  sections,
                  industries,
                  partnerTypes,
                  countries,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                  isJuridic,
                  setIsJuridic,
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
