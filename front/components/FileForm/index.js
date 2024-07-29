"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./form";
import FileList from "./fileList";

export default function FormComponent({ formData, fileableType }) {
  const { formId } = form;
  const {
    formField,
    values: externalValues,
    errors,
    touched,
    setFieldValue,
  } = formData;
  const { files } = formField;

  const handleAddFile = (values) => {
    if (values.file === "") return;
    setFieldValue(files.name, [
      ...externalValues[files.name],
      {
        name: values.name,
        file: values.file,
        path: values.path,
      },
    ]);
  };

  const handleRemoveFile = (name) => {
    const editedValues = externalValues[files.name].filter(
      (file) => file.name != name
    );
    setFieldValue(files.name, editedValues);
  };

  return (
    <MDBox>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={handleAddFile}
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
                handleAddFile,
                fileableType,
              }}
            />
          </Form>
        )}
      </Formik>
      <FileList
        files={externalValues[files.name]}
        removeFile={handleRemoveFile}
      />
    </MDBox>
  );
}
