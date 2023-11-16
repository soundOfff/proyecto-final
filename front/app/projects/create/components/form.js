"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import { Grid, Card, Step, StepLabel, Stepper } from "@mui/material";
import { Formik, Form } from "formik";

import First from "./steps/first";
import Second from "./steps/second";
import Third from "./steps/third";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import { useState } from "react";

const steps = ["Detalles", "Clientes", "Fechas"];

export default function FormComponent({
  partners,
  statuses,
  serviceTypes,
  members,
  billingTypes,
  storeProject,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { formId, formField } = form;

  const getStepContent = (stepIndex, formData) => {
    switch (stepIndex) {
      case 0:
        return <First formData={formData} />;
      case 1:
        return (
          <Second
            formData={formData}
            {...{ partners, statuses, serviceTypes, members, billingTypes }}
          />
        );
      case 2:
        return <Third formData={formData} />;
      default:
        return null;
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await storeProject(values);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <MDBox py={3} mb={20} height="65vh">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", mt: 8 }}
      >
        <Grid item xs={12} lg={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form id={formId} autoComplete="off">
                <Card sx={{ height: "100%" }}>
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
                            back
                          </MDButton>
                        )}
                        <MDButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="gradient"
                          color="dark"
                        >
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
