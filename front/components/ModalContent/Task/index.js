"use client";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import { store as storeItem, update } from "/actions/tasks";
import TaskForm from "./form";
import form from "./schemas/form";
import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ModalContentForm({
  onClose,
  priorities,
  repeats,
  tagsData,
  partners,
  dependencyTasks = [],
  partnerId,
  actionsData = [],
  tableFields = [],
  task = null,
  project = null,
  mode = MODAL_TYPES.CREATE,
}) {
  const { formId, formField } = form;
  const { data: session } = useSession();
  const router = useRouter();
  initialValues.owner_id = session.staff.id;

  const handleSubmit = async (values, actions) => {
    await storeItem(values);
    onClose();
    actions.resetForm();
    router.refresh();
  };

  const handleEdit = async (values, actions) => {
    await update(task.id, values);
    onClose();
    actions.resetForm();
    router.refresh();
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
            partners={partners}
            repeats={repeats}
            tagsData={tagsData}
            task={task}
            dependencyTasks={dependencyTasks}
            onClose={onClose}
            mode={mode}
            partnerId={partnerId}
            project={project}
            actionsData={actionsData}
            tableFields={tableFields}
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
