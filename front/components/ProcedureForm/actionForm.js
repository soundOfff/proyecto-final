import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormField from "/components/ItemForm/FormField";
import MDButton from "/components/MDButton";
import * as Yup from "yup";
import Select from "/components/Select";
import { ACTION_TYPES } from "/utils/constants/actionTypes";

const newActionFormField = {
  formId: "new-action",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      placeholder: "Nombre de la acción",
      errorMsg: "El nombre es requerido",
    },
    description: {
      name: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción de la acción",
      errorMsg: "La descripción es requerida",
    },
    action: {
      name: "action_type_id",
      label: "Tipo de acción",
      errorMsg: "El tipo de acción es requerido",
    },
  },
};

export default function ActionForm({
  actions,
  options,
  setFieldValue: setFieldValueExternal,
  values: externalValues,
}) {
  const { description, name, action } = newActionFormField.formField;

  const clearFields = (actions) => {
    setFieldValue(description.name, "");
    setFieldValue(name.name, "");
    setFieldValue(action.name, "");
    actions.setTouched({});
  };

  const addItemValidationSchema = Yup.object().shape({
    [description.name]: Yup.string().required(description.errorMsg),
    [action.name]: Yup.string().required(action.errorMsg),
    [name.name]: Yup.string().required(name.errorMsg),
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [description.name]: "",
      [name.name]: "",
      [action.name]: "",
    },
    validationSchema: addItemValidationSchema,
    onSubmit: (values, methods) => {
      setFieldValueExternal(actions.name, [
        ...externalValues.actions,
        {
          description: values[description.name],
          name: values[name.name],
          action_type_id: values[action.name],
        },
      ]);
      clearFields(methods);
    },
  });

  return (
    <>
      <Grid item xs={12} sm={3}>
        <Select
          value={values[action.name]}
          options={options}
          optionLabel={(option) => option.label}
          fieldName={action.name}
          inputLabel={action.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={3}>
        <FormField
          value={values[name.name]}
          onChange={(e) => setFieldValue(name.name, e.target.value)}
          name={name.name}
          label={ACTION_TYPES[values[action.name]] ?? name.label}
          type={name.type}
          errors={errors}
          touched={touched}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>
      <Grid item xs={4}>
        <FormField
          value={values[description.name]}
          onChange={(e) => setFieldValue(description.name, e.target.value)}
          name={description.name}
          label={description.label}
          type={description.type}
          errors={errors}
          touched={touched}
          success={
            values[description.name]?.length > 0 && !errors[description.name]
          }
        />
      </Grid>
      <Grid item xs={2}>
        <MDButton
          type="submit"
          variant="gradient"
          color="dark"
          onClick={handleSubmit}
        >
          Agregar
        </MDButton>
      </Grid>
    </>
  );
}
