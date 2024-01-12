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

import { store as storeExpense } from "/actions/expenses";

import { useState } from "react";

const steps = [
  "Nueva proforma",
  "Opcionales de proforma",
  "Detalles de articulos",
  "Terminos y condiciones",
];

export default function FormComponent({
  partners,
  repeats,
  taxes,
  groupIds,
  items,
  serviceTypes,
  agents,
  currencies,
}) {
  const [activeStep, setActiveStep] = useState(1);
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
              subServiceTypes: [{ id: 1, label: "Subtipo1" }],
              currencies,
              labelsData: ["Expired", "Out of Stock", "In Stock", "Sale"],
              states: [
                { id: 1, label: "No Enviada" },
                { id: 2, label: "Enviada" },
                { id: 3, label: "Expirado" },
                { id: 4, label: "Rechazado" },
                { id: 5, label: "Aceptado" },
              ],
            }}
          />
        );
      case 1:
        return (
          <Second
            formData={formData}
            {...{
              states: ["Borrador", "Pendiente", "Pagado"],
              discountTypes: [
                "Sin descuento",
                "Antes del impuesto",
                "Despues del impuesto",
              ],
              repeats,
              agents,
            }}
          />
        );
      case 2:
        return (
          <Third
            formData={formData}
            {...{
              items,
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
    await storeExpense(values);
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
