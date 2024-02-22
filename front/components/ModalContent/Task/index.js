"use client";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import { store as storeItem, update } from "../../../actions/tasks";
import TaskForm from "./form";
import form from "./schemas/form";
import { MODAL_TYPES } from "../../../utils/constants/modalTypes";

export default function ModalContentForm({
  onClose,
  priorities,
  repeats,
  taskableTypes,
  tagsData,
  task = null,
  mode = MODAL_TYPES.CREATE,
}) {
  const { formId, formField } = form;

  const handleSubmit = async (values, actions) => {
    console.log(values);
    await storeItem(values);
    onClose();
    actions.resetForm();
  };

  const handleEdit = async (values, _) => {
    await update(task.id, values);
    onClose();
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={mode === MODAL_TYPES.CREATE ? handleSubmit : handleEdit}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
        resetForm,
      }) => (
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
            mode={mode}
          />
          <MDBox p={3}>
            <MDBox width="100%" display="flex" justifyContent="space-between">
              <MDButton
                variant="gradient"
                color="light"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
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
