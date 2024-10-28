"use client";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { Form, Formik } from "formik";
import form from "./schemas/form";
import { useParams, useRouter } from "next/navigation";
import { store, update } from "/actions/contacts";
import FormContent from "./formContent";

export default function TaskForm({ contact }) {
  const { formField, formId } = form;
  const { partner } = formField;
  const { id } = useParams();
  const router = useRouter();

  initialValues[partner.name] = Number(id);

  const submitForm = async (values, actions) => {
    if (contact) {
      await update(contact.id, values);
    } else {
      await store(values);
    }
    router.push(`/partners/${id}/contacts`);
  };

  const handleSubmit = (values) => {
    submitForm(values);
  };

  return (
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
        resetForm,
      }) => (
        <Form id={formId} autoComplete="off">
          <FormContent
            {...{
              contact,
              values,
              errors,
              setFieldValue,
              isSubmitting,
              resetForm,
              touched,
            }}
          />
        </Form>
      )}
    </Formik>
  );
}
