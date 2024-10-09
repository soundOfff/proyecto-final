"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./form-content";
import MDSnackbar from "/components/MDSnackbar";
import { useEffect, useState } from "react";
import { sendSlackNotification } from "/actions/notifications";
import { useSession } from "next-auth/react";
import { select } from "/actions/staffs";

export default function FormComponent({ handleClose, modelId, modelType }) {
  const { formId } = form;
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const [successMessage, setSuccessMessage] = useState(
    "Notificación enviada correctamente"
  );
  const [successSB, setSuccessSB] = useState(false);
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
      setSuccessSB(true);
      handleClose();
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
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
            <MDSnackbar
              color="success"
              icon="success"
              title="Enviado"
              content={successMessage}
              open={successSB}
              onClose={() => setSuccessSB(false)}
              close={() => setSuccessSB(false)}
              bgWhite
            />
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