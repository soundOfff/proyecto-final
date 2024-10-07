"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import OwnerForm from "./form";

import { update as updateOwner } from "/actions/partners";

export default function ModalContentForm({
  owner = null,
  handleSubmit: handleExternalSubmit,
}) {
  const { formId, formField } = form;

  const handleAddOwner = async (values, { resetForm }) => {
    await updateOwner(owner?.partner_id, {
      related_partners: [values],
    }); // update the owner pivot data
    handleExternalSubmit(); // triggers the parent's handleSubmit
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleAddOwner}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        resetForm,
        isSubmitting,
      }) => (
        <Form
          id={formId}
          autoComplete="off"
          style={{
            height: "100%",
          }}
        >
          <OwnerForm
            formData={{
              values,
              errors,
              touched,
              setFieldValue,
              formField,
            }}
            owner={owner}
          />
          <MDBox>
            <MDButton
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Agregar
            </MDButton>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
}
