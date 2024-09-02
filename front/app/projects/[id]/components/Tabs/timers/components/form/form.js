"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import FormContent from "./form-content";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { store } from "/actions/timers";

export default function FormComponent({ taskId, project, onClose }) {
  const { formId } = form;

  const handleSubmit = (values, actions) => {
    store(values);
    onClose();
  };

  return (
    <MDBox p={5}>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          setFieldError,
        }) => (
          <Form id={formId} autoComplete="off">
            <FormContent
              {...{ values, errors, touched, setFieldValue, project, taskId }}
            />
            <MDBox mt={5} display="flex" justifyContent="end">
              <MDButton
                disabled={isSubmitting}
                type="submit"
                variant="gradient"
                color="dark"
              >
                Guardar
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}
