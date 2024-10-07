"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

import { Grid, Card, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidateExpenses } from "/actions/expenses";
import { update as updateExpense } from "/actions/expenses";
import FormContent from "./form-content";

export default function FormComponent({
  expense,
  partners,
  categories,
  invoices,
  currencies,
  taxes,
  paymentMethods,
  apiUrl,
  repeats,
}) {
  const { formId, formField } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnToSource = () => {
    const source = searchParams.get("source");
    if (!source) {
      router.push("/expenses?perPage=50&page=1");
      return;
    }
    router.push(source);
  };

  const handleCancel = () => returnToSource();

  const submitForm = async (values) => {
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
      if (expense) {
        formData.append("fileable_id", expense.id);
        formData.append("fileable_type", "expense");
      }
    }

    try {
      if (expense) {
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
      } else {
        await fetch(`${apiUrl}/expenses`, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
          next: { tags: ["create-files"] },
        });
      }
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    await submitForm(values);
    await revalidateExpenses("create-files");
    returnToSource();
  };

  return (
    <MDBox py={3} mb={5} height="100%">
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
      <Grid
        container
        justifyContent="center"
        alignItems="start"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={handleSubmit}
          >
            {(formData) => (
              <Form id={formId} autoComplete="off">
                <Card>
                  <MDBox px={5} py={2}>
                    <FormContent
                      {...{
                        expense,
                        formData,
                        formField,
                        partners,
                        categories,
                        invoices,
                        currencies,
                        taxes,
                        paymentMethods,
                        repeats,
                      }}
                    />
                    <MDBox
                      mt={10}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <MDButton
                        variant="gradient"
                        color="light"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </MDButton>
                      <MDButton type="submit" variant="gradient" color="dark">
                        {isLoading ? (
                          <CircularProgress size={24} color="white" />
                        ) : (
                          "Guardar"
                        )}
                      </MDButton>
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
