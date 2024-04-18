"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function FormComponent({ apiUrl }) {
  const { formId } = form;
  const router = useRouter();

  const submitForm = async (values, actions) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      await fetch(`${apiUrl}/files`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      router.push("/files");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

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
