import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormField from "/components/ItemForm/FormField";
import MDButton from "/components/MDButton";
import * as Yup from "yup";
import Select from "/components/Select";
import { ACTION_EMAIL, ACTION_REQUEST } from "/utils/constants/actionTypes";
import { useEffect, useState } from "react";
import { getAll as getAllRequestTemplates } from "/actions/request-templates";

const ENGLISH_CODE = "en"; // TODO: move to constants
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
    mailTo: {
      name: "mail_to",
      label: "Enviar correo a",
      placeholder: "Correo electrónico",
      errorMsg: "El correo es requerido",
    },
    mailTemplateId: {
      name: "mail_template_id",
      label: "Plantilla de correo",
      errorMsg: "La plantilla de correo es requerida",
    },
    requestTemplate: {
      name: "request_template_id",
      label: "Plantilla de Request",
      errorMsg: "La plantilla de request es requerida",
    },
  },
};

export default function ActionForm({
  actions,
  options: actionsOptions,
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  mailTemplates,
}) {
  const [requestTemplates, setRequestTemplates] = useState([]);
  const { name, description, action, mailTo, mailTemplateId, requestTemplate } =
    newActionFormField.formField;

  const clearFields = (actions) => {
    setFieldValue(description.name, "");
    setFieldValue(action.name, "");
    setFieldValue(mailTo.name, "");
    setFieldValue(mailTemplateId.name, "");
    setFieldValue(requestTemplate.name, "");
    actions.setTouched({});
  };

  const addItemValidationSchema = Yup.object().shape({
    [description.name]: Yup.string().required(description.errorMsg),
    [action.name]: Yup.string().required(action.errorMsg),
    [mailTo.name]: Yup.string().email("Correo inválido"),
    [mailTemplateId.name]: Yup.string(),
    [requestTemplate.name]: Yup.string(),
  });
  const filteredMailTemplates = mailTemplates.filter(
    ({ lang }) => lang.code === ENGLISH_CODE
  );

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [description.name]: "",
      [action.name]: "",
      [mailTo.name]: "",
      [mailTemplateId.name]: "",
      [requestTemplate.name]: "",
    },
    validationSchema: addItemValidationSchema,
    onSubmit: (values, methods) => {
      setFieldValueExternal(actions.name, [
        ...externalValues.actions,
        {
          description: values[description.name],
          name: values[name.name],
          action_type_id: values[action.name],
          mail_to: values[mailTo.name],
          mail_template_id: values[mailTemplateId.name],
          request_template_id: values[requestTemplate.name],
        },
      ]);
      clearFields(methods);
    },
  });

  useEffect(() => {
    if (values.actions !== ACTION_EMAIL) {
      setFieldValue(mailTo.name, "");
      setFieldValue(mailTemplateId.name, "");
    }
    if (values.actions !== ACTION_REQUEST) {
      setFieldValue(requestTemplate.name, "");
    }
  }, [values.actions, setFieldValue, mailTo, mailTemplateId, requestTemplate]);

  useEffect(() => {
    getAllRequestTemplates().then((response) =>
      setRequestTemplates(response.data.requestTemplates)
    );
  }, []);

  return (
    <>
      <Grid item xs={12} sm={2}>
        <Select
          value={values[action.name]}
          options={actionsOptions}
          optionLabel={(option) => option.label}
          fieldName={action.name}
          inputLabel={action.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={3}>
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
      {values[action.name] === ACTION_EMAIL && (
        <>
          <Grid item xs={2}>
            <Select
              value={values[mailTemplateId.name]}
              options={filteredMailTemplates}
              optionLabel={(option) => option.name}
              fieldName={mailTemplateId.name}
              inputLabel={mailTemplateId.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <FormField
              value={values[mailTo.name]}
              onChange={(e) => setFieldValue(mailTo.name, e.target.value)}
              name={mailTo.name}
              label={mailTo.label}
              type="email"
              errors={errors}
              touched={touched}
              success={values[mailTo.name]?.length > 0 && !errors[mailTo.name]}
            />
          </Grid>
        </>
      )}
      {values[action.name] === ACTION_REQUEST && (
        <Grid item xs={6}>
          <Select
            value={values[requestTemplate.name]}
            options={requestTemplates}
            optionLabel={(option) => option.name}
            fieldName={requestTemplate.name}
            inputLabel={requestTemplate.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
      )}
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
