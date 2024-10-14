"use client";

import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";

import { Grid } from "@mui/material";
import { Formik, Form } from "formik";

import initialValues from "/app/projects/components/form/schemas/initialValues";
import validations from "/app/projects/components/form/schemas/validations";
import form from "/app/projects/components/form/schemas/form";

import { useEffect, useState } from "react";
import { store as storeProject } from "/actions/projects";
import FormComponent from "/app/projects/components/form/form";

import { useRouter } from "next/navigation";

import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";
import { getSelect as getSelectProposals } from "/actions/proposals";
import { getAll as getRoles } from "/actions/partner-project-roles";
import { getAll as getAllCourts } from "/actions/courts";
import { getAll as getAllStatuses } from "/actions/project-statuses";

export default function ProjectCopyForm({ closeModal, project }) {
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();

  const [partnerData, setPartnerData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [members, setMembers] = useState([]);
  const [billingTypes, setBillingTypes] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [roles, setRoles] = useState([]);
  const [courts, setCourts] = useState([]);

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

  useEffect(() => {
    getPartnerSelect().then((data) => setPartnerData(data));
    getAllServiceTypes().then((data) => setServiceTypes(data));
    selectMembers().then((data) => setMembers(data));
    getAllBillingTypes().then((data) => setBillingTypes(data));
    getSelectProposals().then((data) => setProposals(data));
    getRoles().then((data) => setRoles(data));
    getAllCourts().then((data) => setCourts(data.data.courts));
    getAllStatuses().then((data) => setStatuses(data));
  }, []);

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
