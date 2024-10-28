"use client";

import MDBox from "/components/MDBox";

import { Card, Grid } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";

import { useMaterialUIController, setSnackbar } from "/context";

import {
  store as storeProject,
  update as updateProject,
} from "/actions/projects";
import FormComponent from "./form";

import { useRouter } from "next/navigation";

export default function Index({
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
  const [_, dispatch] = useMaterialUIController();
  const { formId } = form;
  const router = useRouter();

  const submitForm = async (values) => {
    try {
      if (project) {
        await updateProject(project.id, values);
        router.push(`/projects/${project.id}?tab=description`);
      } else {
        const newProject = await storeProject(values);
        router.push(`/projects/${newProject.id}?tab=description`);
      }
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al guardar caso",
        content: error?.message,
        bgWhite: true,
      });
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <MDBox mb={10}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} lg={10}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={handleSubmit}
          >
            {(formData) => (
              <Form id={formId} autoComplete="off">
                <Card>
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
                  />
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}
