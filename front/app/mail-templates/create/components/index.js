"use client";
import { Formik, Form } from "formik";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Card, Grid } from "@mui/material";

import FormContent from "./form";
import form from "./schemas/form";
import initialValues from "./schemas/initial-values";
import validations from "./schemas/validations";

import FieldList from "./field-list";
import { EditorState } from "draft-js";
import { useState } from "react";
import { store as storeMailTemplate } from "/actions/mail-templates";
import { useRouter } from "next/navigation";

export default function MailTemplateIndex({ langs, groups }) {
  const { formField, formId } = form;
  const router = useRouter();

  const [fields, setFields] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async (values) => {
    console.log(values);
    await storeMailTemplate(values);
    router.push("/mail-templates");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <MDBox mb={3} width="100%">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
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
                    Crear template para mail
                  </MDBox>
                  <FormContent
                    editorState={editorState}
                    setEditorState={setEditorState}
                    setFields={setFields}
                    langs={langs}
                    groups={groups}
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
                    <MDBox
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <MDButton variant="gradient" color="light">
                        Volver
                      </MDButton>
                      <MDButton
                        type="button"
                        onClick={() => handleSubmit(values)}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldList
                allowedFields={fields}
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          </Grid>
        </MDBox>
      )}
    </Formik>
  );
}
