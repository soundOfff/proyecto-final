"use client";
import { Formik, Form } from "formik";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Card, Grid } from "@mui/material";

import FormContent from "./form";
import form from "./schemas/form";
import initialValues from "./schemas/initial-values";
import validations from "./schemas/validations";
import MDSnackbar from "/components/MDSnackbar";

import { update } from "/actions/mail-templates";
import FieldList from "./field-list";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  allowedFields,
  getAll as getAllMailTemplates,
} from "/actions/mail-templates";
import { sendTestEmail } from "/actions/mail-templates";

export default function MailTemplateIndex({ mailTemplate, langs }) {
  const { formField, formId } = form;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fields, setFields] = useState([]);
  const [mailTemplates, setMailTemplates] = useState([]);
  const [mailSended, setMailSended] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values) => {
    await update(mailTemplate.id, values);
    router.refresh();
  };

  const handleSendEmail = async () => {
    try {
      await sendTestEmail({
        template_id: mailTemplate.id,
        to: "testing@gmail.com", // TODO: Remove this, only hardcoded for testing
      });
      setMailSended(true);
    } catch (error) {
      console.error(error);
      setMailSended(false);
    }
  };

  useEffect(() => {
    allowedFields({ model: mailTemplate.group.slug }).then((fields) => {
      setFields(fields);
    });
    getAllMailTemplates({
      "filter[event]": mailTemplate.event,
      include: ["group", "lang"],
    }).then((mailTemplates) => {
      setMailTemplates(mailTemplates);
    });
  }, [mailTemplate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <MDBox mb={3} width="100%">
          <MDSnackbar
            color="success"
            icon="check"
            title="Mail sended successfully"
            content={`Mail sended to the test env using the template: ${mailTemplate.event} and on ${mailTemplate.lang.name} language`}
            open={mailSended}
            onClose={() => setMailSended(false)}
            close={() => setMailSended(false)}
            bgWhite
          />
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
                    {mailTemplate.name}
                  </MDBox>
                  <FormContent
                    mailTemplate={mailTemplate}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    relatedMailTemplates={mailTemplates}
                    langs={langs}
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
                        variant="gradient"
                        color="success"
                        onClick={handleSendEmail}
                      >
                        Enviar mail de prueba
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldList
                mailTemplate={mailTemplate}
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
