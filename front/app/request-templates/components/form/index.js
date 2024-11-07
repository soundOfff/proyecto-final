"use client";

import MDBox from "/components/MDBox";

import { Grid, Card } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import FormContent from "./form";
import Tabs from "./tabs";

import { store, update } from "/actions/request-templates";
import { useRouter } from "next/navigation";

export default function FormComponent({ requestTemplate }) {
  const { formId, formField } = form;
  const router = useRouter();

  const handleSubmit = async (values) => {
    if (requestTemplate) {
      await update(requestTemplate.id, values);
      router.push("/request-templates");
    } else {
      await store(values);
      router.push("/request-templates");
    }
  };

  return (
    <MDBox py={3} mb={5} height="100%">
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
                        formData,
                        formField,
                        requestTemplate,
                      }}
                    />
                    <Tabs formData={formData} />
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
