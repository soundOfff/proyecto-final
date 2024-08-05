"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

import FormContent from "./form";
import FileList from "./fileList";
import UploadFileList from "./uploadFileList";

import { destroy as deleteFile } from "/actions/files";

export default function FormComponent({ formData, fileableType, data = null }) {
  const { formId } = form;
  const { formField, values: externalValues, setFieldValue } = formData;
  const { files } = formField;
  const [modifiedFiles, setModifiedFiles] = useState(
    externalValues[files.name] ?? []
  );
  const [uploadedFiles, setUploadedFiles] = useState(data ?? []);

  useEffect(() => {
    setFieldValue(files.name, modifiedFiles);
  }, [modifiedFiles, setFieldValue, files.name]);

  const handleAddFile = (file) => {
    setModifiedFiles((prev) => {
      return [
        ...prev,
        {
          name: file.name,
          file: file,
        },
      ];
    });
  };

  const handleDeleteUploadedFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles((prev) => {
        return prev.filter((f) => f.id !== fileId);
      });
    } catch (error) {
      console.error(error);
    }
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
  };

  const handleRemoveFile = (file) => {
    setModifiedFiles((prev) => {
      return prev.filter((f) => {
        return f.file.upload.uuid !== file.upload.uuid;
      });
    });
  };

  return (
    <MDBox>
      {uploadedFiles.length > 0 && (
        <UploadFileList
          files={uploadedFiles}
          handleDeleteFile={handleDeleteUploadedFile}
        />
      )}
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
            <MDTypography
              variant="body1"
              fontWeight="medium"
              color="dark"
              my={2}
            >
              Adjuntar archivos
            </MDTypography>
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
        uploadedFiles={data}
        handleRemoveFile={handleRemoveFile}
        handleEditFile={handleEditFile}
      />
    </MDBox>
  );
}
