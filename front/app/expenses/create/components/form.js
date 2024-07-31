"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

import { Grid, Card, Step, StepLabel, Stepper } from "@mui/material";
import { Formik, Form } from "formik";

import First from "./steps/first";
import Second from "./steps/second";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";
import FileForm from "/components/FileForm";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EXPENSE_FILEABLE_TYPE } from "/utils/constants/fileableTypes";
import { revalidateExpenses } from "/actions/expenses";

const steps = ["Nuevo Gasto", "Opciones avanzadas", "Adjuntar archivo"];

export default function FormComponent({
  partners,
  categories,
  invoices,
  currencies,
  taxes,
  paymentMethods,
  apiUrl,
  repeats,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { formId, formField } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();
  const searchParams = useSearchParams();

  const getStepContent = (stepIndex, formData) => {
    switch (stepIndex) {
      case 0:
        return (
          <First formData={formData} {...{ partners, categories, invoices }} />
        );
      case 1:
        return (
          <Second
            formData={formData}
            {...{ currencies, taxes, paymentMethods, repeats }}
          />
        );
      case 2:
        return (
          <FileForm formData={formData} fileableType={EXPENSE_FILEABLE_TYPE} />
        );
      default:
        return null;
    }
  };

  const returnToSource = () => {
    const source = searchParams.get("source");
    if (!source) {
      router.push("/expenses?perPage=25&page=1");
      return;
    }
    router.push(source);
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const handleCancel = () => returnToSource();

  const submitForm = async (values, actions) => {
    const formData = new FormData();
    const files = values[formField.files.name];

    files.forEach((rawFile) => {
      formData.append("files[]", rawFile.file);
      formData.append("files_info[]", rawFile.name);
    });

    delete values[formField.files.name];

    for (const key in values) {
      if (values[key] === "") continue;
      if (values[key] == false || values[key] == true) {
        formData.append(key, values[key] ? 1 : 0);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await fetch(`${apiUrl}/expenses`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        next: { tags: ["create-files"] },
      });
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
      revalidateExpenses();
      returnToSource();
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <MDBox py={3} mb={20} height="auto">
      <Grid
        container
        justifyContent="center"
        alignItems="start"
        sx={{ height: "100%", mt: 2 }}
      >
        <Grid item xs={12} lg={8}>
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
                          <MDButton
                            variant="gradient"
                            color="light"
                            onClick={handleCancel}
                          >
                            {" "}
                            Cancelar
                          </MDButton>
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
