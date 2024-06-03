"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import MDSnackbar from "/components/MDSnackbar";
import { store, update } from "/actions/procedures";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormComponent({
  processId,
  procedure,
  procedures,
  actionTypes,
}) {
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();

  const submitForm = async (values, actions) => {
    try {
      // TODO: Fix stepNumber + 1 parse
      await store({ ...values, process_id: processId });
      router.push(`/processes/${processId}`);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const handleBack = () => {
    router.push(`/processes/${processId}`);
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
                procedures,
                procedure,
                actionTypes,
              }}
            />
            <MDBox
              mt={5}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MDButton
                variant="gradient"
                color="light"
                alignSelf="start"
                onClick={handleBack}
              >
                Volver
              </MDButton>
              <MDButton type="submit" variant="gradient" color="dark">
                Guardar
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}
