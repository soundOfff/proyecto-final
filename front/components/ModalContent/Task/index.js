"use client";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import { store as storeItem } from "../../../actions/tasks";
import TaskForm from "./form";
import form from "./schemas/form";

export default function ModalContentForm({
  onClose,
  priorities,
  repeats,
  taskableTypes,
  tagsData,
  task = null,
}) {
  const { formId, formField } = form;

  const handleSubmit = async (values, _) => {
    values.description = editorState.getCurrentContent().getPlainText(); // kk
    console.log({ values });
    await storeItem(values);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form id={formId} autoComplete="off">
          <TaskForm
            priorities={priorities}
            formData={{
              values,
              errors,
              touched,
              setFieldValue,
              formField,
            }}
            repeats={repeats}
            taskableTypes={taskableTypes}
            tagsData={tagsData}
            task={task}
            onClose={onClose}
          />
          <MDBox p={3}>
            <MDBox width="100%" display="flex" justifyContent="space-between">
              <MDButton variant="gradient" color="light" onClick={onClose}>
                Cancelar
              </MDButton>
              <MDButton
                disabled={isSubmitting}
                type="submit"
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
