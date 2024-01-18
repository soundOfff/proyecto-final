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

import { store as storeEstimate } from "/actions/estimates";

import { useState } from "react";
import {
  AFTER_TAX,
  BEFORE_TAX,
  WITHOUT_DISCOUNT,
} from "/utils/constants/discountTypes";

const steps = [
  "Nueva proforma",
  "Opcionales de proforma",
  "Detalles de articulos",
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
  tags,
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
              subServiceTypes: [{ id: 1, label: "Subtipo1" }],
              currencies,
              tagsData: tags,
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
                { id: WITHOUT_DISCOUNT, label: "Sin descuento" },
                { id: BEFORE_TAX, label: "Antes del impuesto" },
                { id: AFTER_TAX, label: "Después del impuesto" },
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
              lineTypes: [
                { id: 1, label: "Honorarios" },
                { id: 2, label: "Gastos" },
              ],
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
    await storeEstimate(values);
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
