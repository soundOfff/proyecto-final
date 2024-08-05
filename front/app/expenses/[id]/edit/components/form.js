"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

import { Grid, Card, Step, StepLabel, Stepper } from "@mui/material";
import { Formik, Form } from "formik";

import First from "./steps/first";
import Second from "./steps/second";
import FileForm from "/components/FileForm";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import { EXPENSE_FILEABLE_TYPE } from "/utils/constants/fileableTypes";

import { useSearchParams, useRouter } from "next/navigation";

import { update as updateExpense } from "/actions/expenses";

import { useState } from "react";
import { revalidateExpenses } from "/actions/expenses";

const steps = ["Nuevo Gasto", "Opciones avanzadas", "Adjuntar archivo"];

export default function FormComponent({
  expense,
  partners,
  categories,
  invoices,
  apiUrl,
  currencies,
  taxes,
  paymentMethods,
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
          <First
            formData={formData}
            {...{ expense, partners, categories, invoices }}
          />
        );
      case 1:
        return (
          <Second
            formData={formData}
            {...{ expense, currencies, taxes, paymentMethods, repeats }}
          />
        );
      case 2:
        return (
          <FileForm
            formData={formData}
            fileableType={EXPENSE_FILEABLE_TYPE}
            data={expense?.files}
          />
        );
      default:
        return null;
    }
  };

  const returnToSource = () => {
    const source = searchParams.get("source");
    if (!source) {
      router.push("/expenses");
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
    formData.append("fileable_type", EXPENSE_FILEABLE_TYPE);
    formData.append("fileable_id", expense.id);

    delete values[formField.files.name];

    try {
      if (files.length > 0) {
        await fetch(`${apiUrl}/files-store-many`, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
          next: { tags: ["update-files"] },
        });
      }
      await updateExpense(expense.id, values);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = async (values, actions) => {
    if (isLastStep) {
      await submitForm(values, actions);
      await revalidateExpenses("update-files");
      returnToSource();
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
