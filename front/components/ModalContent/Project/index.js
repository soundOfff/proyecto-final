"use client";

import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";

import { Grid } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "/app/projects/components/form/schemas/initialValues";
import validations from "/app/projects/components/form/schemas/validations";
import form from "/app/projects/components/form/schemas/form";

import { useState } from "react";
import { store as storeProject } from "/actions/projects";
import FormComponent from "/app/projects/components/form/form";

import { useRouter } from "next/navigation";

export default function ProjectCopyForm({
  closeModal,
  project,
  partners: partnerData,
  statuses,
  serviceTypes,
  members,
  billingTypes,
  proposals,
  roles,
  courts,
}) {
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();

  const submitForm = async (values) => {
    try {
      const newProject = await storeProject(values);
      router.push(`/projects/${newProject.id}?tab=description`);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    } finally {
      closeModal();
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <MDBox mb={2}>
      <MDBox
        color="white"
        bgColor="dark"
        variant="gradient"
        borderRadius="lg"
        shadow="lg"
        overflow="auto"
        opacity={1}
        p={2}
      >
        Crear nuevo proyecto desde: {project.name}
      </MDBox>
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
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={handleSubmit}
          >
            {(formData) => (
              <Form id={formId} autoComplete="off">
                <FormComponent
                  {...{
                    formData,
                    project,
                    partnerData,
                    statuses,
                    serviceTypes,
                    members,
                    billingTypes,
                    proposals,
                    roles,
                    courts,
                  }}
                  isCopy={true}
                  closeModal={closeModal}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}
