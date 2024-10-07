"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import {
  store as storePartner,
  update as updatePartner,
} from "/actions/partners";
import MDBox from "/components/MDBox";
import Modal from "/components/Modal";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import DetailForm from "./detail-form";
import InvoiceForm from "./invoice-form";
import Tabs from "./tabs";
import form from "../schemas/form";
import initialValues from "../schemas/initial-values";
import validations from "../schemas/validations";
import MDSnackbar from "/components/MDSnackbar";
import { useRouter } from "next/navigation";

export default function FormComponent({
  partner,
  consolidators,
  notJuridicEntities,
  sections,
  industries,
  countries,
  partnerTypes,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isJuridic, setIsJuridic] = useState(Boolean(partner?.company));
  const [isRequired, setIsRequired] = useState(true);
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const submitForm = async (values, actions) => {
    try {
      if (partner) {
        await updatePartner(partner.id, values);
      } else {
        await storePartner(values);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = async (values, actions) => {
    await submitForm(values, actions);
    window.location.reload();
  };

  const getCurrentValidation = () => {
    if (isJuridic) {
      return isRequired ? validations.juridical : validations.juridicalOptional;
    } else {
      return isRequired ? validations.person : validations.personOptional;
    }
  };

  return (
    <MDBox py={5}>
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <Formik
        initialValues={initialValues}
        validationSchema={getCurrentValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
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
            {tabIndex === 0 ? (
              <DetailForm
                {...{
                  consolidators,
                  notJuridicEntities,
                  sections,
                  industries,
                  partnerTypes,
                  countries,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                  isJuridic,
                  setIsJuridic,
                  isRequired,
                  setIsRequired,
                  partner,
                }}
              />
            ) : (
              <InvoiceForm
                {...{
                  partner,
                  countries,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                }}
              />
            )}
            {isRequired && (
              <Grid item xs={12}>
                <MDBox display="flex" justifyContent="end">
                  <MDButton color="dark" type="submit">
                    Guardar
                  </MDButton>
                </MDBox>
              </Grid>
            )}
            {!isRequired && (
              <Grid item xs={12}>
                <MDBox display="flex" justifyContent="end">
                  <MDButton
                    color="dark"
                    onClick={() => {
                      setOpenConfirmation(true);
                    }}
                  >
                    Guardar
                  </MDButton>
                </MDBox>
              </Grid>
            )}
            <Modal
              width="max-content"
              height="min-content"
              border="0px solid transparent"
              open={openConfirmation}
              onClose={() => {
                setOpenConfirmation(false);
              }}
            >
              <MDBox p={2}>
                <MDTypography variant="h4" mb={5}>
                  ¿Faltan campos, está seguro que desea realizar esta acción?
                </MDTypography>
                <MDBox display="flex" justifyContent="end">
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={() => handleSubmit(values)}
                  >
                    Confirmar
                  </MDButton>
                </MDBox>
              </MDBox>
            </Modal>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}
