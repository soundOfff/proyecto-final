"use client";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { Form, Formik } from "formik";
import form from "./schemas/form";
import { store as storeItem } from "../../../actions/tasks";
import TaskForm from "./form";

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
    await storeItem(values);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          <TaskForm
            priorities={priorities}
            repeats={repeats}
            taskableTypes={taskableTypes}
            tagsData={tagsData}
            task={task}
            // values={values}
            // formData={{
            //   values,
            //   errors,
            //   touched,
            //   setFieldValue,
            // }}
          />
        </Form>
      )}
    </Formik>
  );
}
