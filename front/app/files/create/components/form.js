"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./formContent";
import { useSearchParams, useRouter } from "next/navigation";
import { revalidateFiles } from "/actions/files";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({ apiUrl }) {
  const [_, dispatch] = useMaterialUIController();
  const { formId } = form;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const returnToSource = () => {
    const source = searchParams.get("source");
    if (!source) {
      router.push("/files");
      return;
    }
    router.push(source);
  };

  const submitForm = async (values) => {
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
          ...(session && session.staff
            ? { Authorization: `Bearer ${session.staff.token}` }
            : {}),
        },
        next: { tags: ["create-file"] },
      });

      revalidateFiles();
      returnToSource();
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al crear el gasto",
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
