"use client";
import { Formik, Form } from "formik";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import FormContent from "./form";
import form from "./schemas/form";
import initialValues from "./schemas/initial-values";
import validations from "./schemas/validations";

import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { parseEditorState } from "/utils/parseEditorState";

export default function MailTemplateForm({ mailTemplate }) {
  const { formField, formId } = form;

  const handleSubmit = () => {}; // todo: make this works
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          <Card sx={{ width: "100%" }}>
            <MDBox
              color="white"
              bgColor="dark"
              variant="gradient"
              borderRadius="lg"
              shadow="lg"
              opacity={1}
              display="flex"
              justifyContent="center"
              p={1}
              m={2}
            >
              {mailTemplate.name}
            </MDBox>
            <FormContent
              mailTemplate={mailTemplate}
              formData={{
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
                formField,
              }}
            />
            <MDBox p={2}>
              <MDBox width="100%" display="flex" justifyContent="space-between">
                <MDButton variant="gradient" color="light">
                  Volver
                </MDButton>
                <MDButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="gradient"
                  color="dark"
                >
                  Guardar
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
