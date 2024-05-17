"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

import { Grid, Card, Step, StepLabel, Stepper } from "@mui/material";
import { Formik, Form } from "formik";

import First from "./steps/first";
import Second from "./steps/second";
import Third from "./steps/third";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import { update as updateProposal } from "/actions/proposals";

import { useState } from "react";

const steps = [
  "Nueva Propuesta",
  "Información Del Cliente",
  "Detalles de Artículos",
];

export default function FormComponent({
  proposal,
  partners,
  currencies,
  tags,
  statuses,
  discountTypes,
  staffs,
  countries,
  taxes,
  groupIds,
  items,
  itemTypes,
  defaultCurrency,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { formId, formField } = form;
  const { currency } = formField;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  initialValues[currency.name] = defaultCurrency.id;

  const getStepContent = (stepIndex, formData) => {
    switch (stepIndex) {
      case 0:
        return (
          <First
            formData={formData}
            {...{
              proposal,
              partners,
              currencies,
              tags,
              discountTypes,
            }}
          />
        );
      case 1:
        return (
          <Second
            formData={formData}
            {...{
              proposal,
              statuses,
              staffs,
              countries,
            }}
          />
        );
      case 2:
        return (
          <Third
            formData={formData}
            {...{
              proposal,
              items,
              itemTypes,
              taxes,
              groupIds,
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    try {
      await updateProposal(proposal.id, values);
    } catch (error) {
      setErrorSB(true);
      setErrorMsg("Ha ocurrido un error");
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
      actions.setFieldValue(
        "items",
        proposal.items.map((item) => ({
          ...item,
          long_description: item.longDescription || "",
          discount: item.discount || "",
        }))
      );
    }
  };

  return (
    <MDBox py={3} mb={20}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={11}>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              setFieldError,
            }) => (
              <Form id={formId} autoComplete="off">
                <Card sx={{ height: "100%" }}>
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
                  <MDBox mx={2} mt={-3}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </MDBox>
                  <MDBox p={3}>
                    <MDBox>
                      {getStepContent(activeStep, {
                        values,
                        touched,
                        formField,
                        errors,
                        setFieldValue,
                        setFieldTouched,
                        setFieldError,
                      })}
                      <MDBox
                        mt={2}
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                      >
                        {activeStep === 0 ? (
                          <MDBox />
                        ) : (
                          <MDButton
                            variant="gradient"
                            color="light"
                            onClick={handleBack}
                          >
                            Anterior
                          </MDButton>
                        )}
                        <MDButton type="submit" variant="gradient" color="dark">
                          {isLastStep ? "Guardar" : "Siguiente"}
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}
