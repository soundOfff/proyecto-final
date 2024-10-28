"use client";

import { Formik, Form } from "formik";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Link from "next/link";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";

import { store, update } from "/actions/procedures";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({
  processId,
  procedure,
  procedures,
  staffs,
  actionTypes,
  mailTemplates = [],
}) {
  const [_, dispatch] = useMaterialUIController();
  const { formId } = form;
  const router = useRouter();
  const { data: session } = useSession();

  const submitForm = async (values) => {
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
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al guardar el procedimiento",
        content: error?.message,
        bgWhite: true,
      });
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
                procedures,
                procedure,
                staffs,
                actionTypes,
                mailTemplates,
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
