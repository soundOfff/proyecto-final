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

import { update as updateEstimate } from "/actions/estimates";

import { useState } from "react";

const steps = [
  "Nueva proforma",
  "Opcionales de proforma",
  "Detalles de articulos",
];

export default function FormComponent({
  estimate,
  partners,
  taxes,
  recurrings,
  groupIds,
  items,
  serviceTypes,
  agents,
  currencies,
  tags,
  statuses,
  itemTypes,
  discountTypes,
  subServiceTypes,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { formId, formField } = form;

  const getStepContent = (stepIndex, formData) => {
    switch (stepIndex) {
      case 0:
        return (
          <First
            formData={formData}
            {...{
              partners,
              serviceTypes,
              subServiceTypes,
              currencies,
              tags,
              estimate,
            }}
          />
        );
      case 1:
        return (
          <Second
            formData={formData}
            {...{
              statuses,
              discountTypes,
              recurrings,
              agents,
              estimate,
            }}
          />
        );
      case 2:
        return (
          <Third
            formData={formData}
            {...{
              items,
              itemTypes,
              taxes,
              groupIds,
              estimate,
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await updateEstimate(estimate.id, values);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
      actions.setFieldValue("items", estimate.items);
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
