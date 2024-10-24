"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

import { Grid, Card } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";
import FormContent from "./form-content";

import { store } from "/actions/processes";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { update } from "/actions/processes";
import { useSession } from "next-auth/react";

import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({
  projectServiceTypes,
  process,
  processes,
  staffData,
}) {
  const [controller, dispatch] = useMaterialUIController();
  const { formId } = form;
  const router = useRouter();
  const { data: session } = useSession();

  const submitForm = async (values) => {
    try {
      if (process) {
        await update(process.id, { ...values, author_id: session.staff.id });
      } else {
        await store({ ...values, author_id: session.staff.id });
      }
      router.push("/processes");
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "No se pudo guardar el proceso",
        content: error?.message,
        bgWhite: true,
      });
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <MDBox mb={20}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={11}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
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
                  <MDBox py={5} px={1}>
                    <MDBox pb={3} px={3}>
                      <FormContent
                        {...{
                          values,
                          errors,
                          touched,
                          setFieldValue,
                          projectServiceTypes,
                          process,
                          processes,
                          staffData,
                        }}
                      />
                      <MDBox display="flex" justifyContent="end" mt={5}>
                        <MDButton color="dark" type="submit">
                          Guardar
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
