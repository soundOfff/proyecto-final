"use client";

import { Formik, Form } from "formik";
import MDBox from "/components/MDBox";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import FormContent from "./form";
import FileList from "./fileList";
import { useState } from "react";

export default function FormComponent({ formData, fileableType }) {
  const { formId } = form;
  const { formField, values: externalValues, setFieldValue } = formData;
  const { files } = formField;
  const [modifiedFiles, setModifiedFiles] = useState(
    externalValues[files.name] ?? []
  );

  const handleAddFile = (file) => {
    setModifiedFiles((prev) => [
      ...prev,
      {
        name: file.upload.filename,
        file: file,
        path: "/expense",
      },
    ]);
    setFieldValue(files.name, modifiedFiles);
  };

  const handleEditFile = (file, text) => {
    const editedValues = modifiedFiles.map((f) => {
      if (f.file.upload.uuid == file.upload.uuid) {
        return {
          name: text,
          file: file,
        };
      }
      return f;
    });
    setModifiedFiles(editedValues);
    setFieldValue(files.name, editedValues);
  };

  const handleRemoveFile = (file) => {
    setModifiedFiles((prev) => {
      return prev.filter((f) => {
        return f.file.upload.uuid !== file.upload.uuid;
      });
    });

    setFieldValue(files.name, modifiedFiles);
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
                handleRemoveFile,
                fileableType,
              }}
            />
          </Form>
        )}
      </Formik>
      <FileList
        files={modifiedFiles}
        handleRemoveFile={handleRemoveFile}
        handleEditFile={handleEditFile}
      />
    </MDBox>
  );
}
