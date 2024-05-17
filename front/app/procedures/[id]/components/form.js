"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { show, update } from "/actions/procedures";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormComponent({ procedureId }) {
  const { formId } = form;
  const [procedure, setProcedure] = useState(null);
  const router = useRouter();
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");

  const submitForm = async (values, actions) => {
    try {
      await update(procedureId, values);
      router.push(`/processes/${procedure.process.id}`);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const handleBack = () => {
    if (procedure?.process) {
      router.push(`/processes/${procedure.process.id}`);
    } else {
      router.push("/processes");
    }
  };

  useEffect(() => {
    show(procedureId, { include: "process.procedures" }).then((procedure) => {
      setProcedure(procedure);
    });
  }, [procedureId]);

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
                procedure,
              }}
            />
            <MDBox
              mt={5}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MDButton variant="gradient" color="light" onClick={handleBack}>
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
