"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { Card, CircularProgress } from "@mui/material";
import { store } from "/actions/notes";
import { useRouter } from "next/navigation";

import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({ partnerId }) {
  const [controller, dispatch] = useMaterialUIController();
  const { formId } = form;
  const router = useRouter();

  const submitForm = async (values, actions) => {
    try {
      await store({
        ...values,
        notable_id: partnerId,
        notable_type: "customer",
      });
      router.push(`/partners/${partnerId}/notes`);
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al crear la nota",
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
      <Card>
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
              <MDBox m={3} display="flex" justifyContent="end">
                <MDButton type="submit" variant="gradient" color="dark">
                  {isSubmitting ? (
                    <CircularProgress size={24} color="white" />
                  ) : (
                    "Guardar"
                  )}
                </MDButton>
              </MDBox>
            </Form>
          )}
        </Formik>
      </Card>
    </MDBox>
  );
}
