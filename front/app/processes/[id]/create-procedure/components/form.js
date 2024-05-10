"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { getAll, store } from "/actions/procedures";
import { useEffect, useState } from "react";

export default function FormComponent({ processId }) {
  const { formId } = form;
  const [procedures, setProcedures] = useState([]);

  const submitForm = async (values, actions) => {
    await store({ ...values, process_id: processId });
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  useEffect(() => {
    getAll({ "filter[process_id]": processId }).then((response) => {
      setProcedures(response.data.procedures);
    });
  }, [processId]);

  return (
    <MDBox>
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
              {...{
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                setFieldError,
                procedures,
              }}
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
