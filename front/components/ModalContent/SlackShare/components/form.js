"use client";

import { Formik, Form } from "formik";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./form-content";

import { useEffect, useState } from "react";
import { sendSlackNotification } from "/actions/notifications";
import { useSession } from "next-auth/react";
import { select } from "/actions/staffs";
import { useMaterialUIController, setSnackbar } from "/context";

export default function FormComponent({ handleClose, modelId, modelType }) {
  const [_, dispatch] = useMaterialUIController();
  const { formId } = form;
  const { data: session } = useSession();
  const [staffs, setStaffs] = useState([]);

  const submitForm = async (values, actions) => {
    try {
      await sendSlackNotification({
        ...values,
        notification_by: session?.staff?.id,
        model_id: modelId,
        model_type: modelType,
      });
      actions.resetForm();
      setSnackbar(dispatch, {
        color: "success",
        icon: "success",
        title: "Enviado",
        content: "La notificación ha sido enviada correctamente",
        bgWhite: true,
      });
      handleClose();
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al enviar la notificación",
        content: error?.message,
        bgWhite: true,
      });
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  useEffect(() => {
    select({ "filter[has-channels]": true }).then((staffs) => {
      setStaffs(staffs);
    });
  }, []);

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
                staffs,
              }}
            />
            <MDBox mt={5} display="flex" justifyContent="end">
              <MDButton type="submit" variant="gradient" color="dark">
                Enviar
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}
