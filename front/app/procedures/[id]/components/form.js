"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { show, update } from "/actions/procedures";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FormComponent({ procedureId }) {
  const { formId } = form;
  const [procedure, setProcedure] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const submitForm = async (values, actions) => {
    await update(procedureId, values);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const handleBack = () => {
    router.push(`/processes/${procedure ? procedure.process.id : ""}`);
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
