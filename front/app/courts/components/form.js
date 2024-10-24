"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { useSearchParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { store, update } from "/actions/courts";
import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({ court }) {
  const [controller, dispatch] = useMaterialUIController();
  const { formId } = form;
  const searchParams = useSearchParams();
  const router = useRouter();

  const returnToSource = () => {
    const source = searchParams.get("source");
    if (!source) {
      router.push("/courts");
      return;
    }
    router.push(source);
  };

  const submitForm = async (values) => {
    try {
      if (court) {
        await update(court.id, values);
      } else {
        await store(values);
      }
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al crear el juzgado",
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
                court,
              }}
            />
            <MDBox mt={5} display="flex" justifyContent="space-between">
              <MDButton
                type="button"
                variant="gradient"
                color="light"
                onClick={returnToSource}
              >
                Volver
              </MDButton>
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
    </MDBox>
  );
}
