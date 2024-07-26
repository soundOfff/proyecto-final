"use client";

import React, { forwardRef, useState } from "react";
import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./form";
import MDSnackbar from "/components/MDSnackbar";
import { revalidateFiles } from "/actions/files";
import { useRouter } from "next/navigation";

const FileForm = forwardRef(
  (
    {
      apiUrl,
      sourcePath = "/files",
      isStep = false,
      fileableType = null,
      fileableId = null,
      externalFormRef = null,
    },
    ref
  ) => {
    const { formId } = form;
    const [errorSB, setErrorSB] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
    const router = useRouter();

    const handleBack = () => {
      router.push(sourcePath);
    };

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
          next: { tags: ["create-file"] },
        });

        revalidateFiles();
      } catch (error) {
        setErrorMsg(error.message);
        setErrorSB(true);
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
              {!isStep && (
                <MDBox mt={5} display="flex" justifyContent="space-between">
                  <MDButton
                    type="button"
                    variant="gradient"
                    color="light"
                    onClick={handleBack}
                  >
                    Volver
                  </MDButton>
                  <button type="submit" ref={ref}>
                    Guardar
                  </button>
                </MDBox>
              )}
            </Form>
          )}
        </Formik>
      </MDBox>
    );
  }
);

export default FileForm;
