"use client";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

import { Form, Formik } from "formik";
import FormContent from "./formContent";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import Link from "next/link";

import { store, update } from "/actions/staffs";

import { useMaterialUIController, setSnackbar } from "/context";

export default function StaffForm({ staff = null }) {
  const [_, dispatch] = useMaterialUIController();
  const { formField, formId } = form;

  const handleSubmit = async (values) => {
    if (staff) {
      try {
        await update(staff.id, values);
        setSnackbar(dispatch, {
          color: "success",
          icon: "done",
          title: "Staff actualizado",
          content: "Staff actualizado con éxito",
          bgWhite: true,
        });
      } catch (error) {
        setSnackbar(dispatch, {
          color: "error",
          icon: "warning",
          title: "Error al actualizar staff",
          content: error?.message,
          bgWhite: true,
        });
      }
    } else {
      await store(values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
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
