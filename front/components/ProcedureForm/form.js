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
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FormComponent({
  processId,
  procedure,
  procedures,
  staffs,
  actionTypes,
}) {
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();
  const { data: session } = useSession();

  const submitForm = async (values, actions) => {
    try {
      if (procedure) {
        await update(procedure.id, {
          ...values,
          process_id: procedure.processId,
          author_id: session.staff.id,
        });
        router.push(`/processes/${procedure.processId}`);
      } else {
        const lastProcedure = procedures.sort(
          (a, b) => b.stepNumber - a.stepNumber
        )[0];
        const lastStepNumber = lastProcedure?.stepNumber ?? 0;

        await store({
          ...values,
          process_id: processId,
          step_number: lastStepNumber + 1,
          author_id: session.staff.id,
        });
        router.push(`/processes/${processId}`);
      }
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
                procedures,
                procedure,
                staffs,
                actionTypes,
              }}
            />
            <MDBox
              mt={5}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Link href={`/processes/${processId}`}>
                <MDButton variant="gradient" color="light" alignSelf="start">
                  Volver
                </MDButton>
              </Link>
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
