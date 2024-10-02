"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import OwnerForm from "./form";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

export default function ModalContentForm({
  owner = null,
  handleCancel,
  handleSubmit,
}) {
  const { formId, formField } = form;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
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
            handleCancel={handleCancel}
          />
          <MDBox p={3} mt={2}>
            <MDBox width="100%" display="flex" justifyContent="space-between">
              <MDButton variant="gradient" color="light" onClick={handleCancel}>
                Cancelar
              </MDButton>
              <MDButton
                disabled={isSubmitting}
                type="submit"
                variant="gradient"
                color="dark"
              >
                Guardar
              </MDButton>
            </MDBox>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
}
