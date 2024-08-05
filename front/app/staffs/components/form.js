"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { Form, Formik } from "formik";
import FormContent from "./formContent";
import { store, update } from "/actions/staffs";
import MDSnackbar from "/components/MDSnackbar";
import { useState } from "react";
import Link from "next/link";

export default function StaffForm({ staff = null }) {
  const { formField, formId } = form;
  const [isUpdated, setIsUpdated] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (values) => {
    if (staff) {
      try {
        await update(staff.id, values);
        setIsUpdated(true);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      return;
    }
    await store(values);
  };

  const renderSnackbar = () => {
    return isUpdated ? (
      <MDSnackbar
        color="success"
        icon="done"
        title="Staff actualizado"
        content={"Staff actualizado con éxito"}
        open={isUpdated}
        onClose={() => setIsUpdated(false)}
        close={() => setIsUpdated(false)}
        bgWhite
      />
    ) : isError ? (
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error al actualizar staff"
        content={"Ocurrió un error al actualizar el staff, intente de nuevo"}
        open={isError}
        onClose={() => setIsError(false)}
        close={() => setIsError(false)}
        bgWhite
      />
    ) : null;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          {renderSnackbar()}
          <MDBox
            color="white"
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            {staff
              ? `${staff.firstName} ${staff.lastName} - Último acceso: ${staff.lastLogin}`
              : "Nuevo Staff"}
          </MDBox>
          <FormContent
            formData={{
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
              formField,
            }}
            staff={staff}
          />
          <MDBox p={2}>
            <MDBox width="100%" display="flex" justifyContent="space-between">
              <Link href="/staffs">
                <MDButton variant="gradient" color="light">
                  Volver
                </MDButton>
              </Link>
              <MDButton
                type="submit"
                disabled={isSubmitting}
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
