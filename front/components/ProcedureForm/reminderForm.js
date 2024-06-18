import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormField from "/components/ItemForm/FormField";
import MDButton from "/components/MDButton";
import * as Yup from "yup";
import moment from "moment";
import Select from "/components/Select";
import MDDatePicker from "/components/MDDatePicker";

const newActionFormField = {
  formId: "add-reminders",
  formField: {
    description: {
      name: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción",
      errorMsg: "La descripción es requerida",
    },
    date: {
      name: "date",
      label: "Fecha",
      errorMsg: "La fecha es requerida",
    },
    staff: {
      name: "staff_id",
      label: "Para",
      errorMsg: "El staff es requerido",
    },
  },
};

export default function ReminderForm({
  staffs,
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  remindersField,
}) {
  const { description, staff, date } = newActionFormField.formField;

  const clearFields = (actions) => {
    setFieldValue(description.name, "");
    setFieldValue(staff.name, "");
    setFieldValue(date.name, "");
    actions.setTouched({});
  };

  const addItemValidationSchema = Yup.object().shape({
    [description.name]: Yup.string().required(description.errorMsg),
    [date.name]: Yup.string().required(date.errorMsg),
    [staff.name]: Yup.number().required(staff.errorMsg),
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [description.name]: "",
      [date.name]: "",
      [staff.name]: "",
    },
    validationSchema: addItemValidationSchema,
    onSubmit: (values, methods) => {
      setFieldValueExternal(remindersField.name, [
        ...externalValues[remindersField.name],
        {
          description: values[description.name],
          date: values[date.name],
          staff_id: values[staff.name],
        },
      ]);
      clearFields(methods);
    },
  });

  return (
    <>
      <Grid item xs={12} sm={3}>
        <Select
          value={values[staff.name]}
          options={staffs}
          optionLabel={(option) => option.name}
          fieldName={staff.name}
          inputLabel={staff.label}
          setFieldValue={setFieldValue}
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
      <Grid item xs={3}>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: date.label,
          }}
          value={values[date.name]}
          onChange={(value) =>
            setFieldValue(
              date.name,
              moment(value[0]).format("YYYY-MM-DD HH:mm:ss")
            )
          }
          options={{ minDate: new Date(), enableTime: true }}
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
