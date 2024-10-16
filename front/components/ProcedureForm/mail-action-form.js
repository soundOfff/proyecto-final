import { Grid } from "@mui/material";
import FormField from "/components/ItemForm/FormField";
import Select from "/components/Select";

export default function MailActionForm({
  formField,
  values,
  setFieldValue,
  mailTemplates = [],
  errors,
}) {
  const { mailTo, mailTemplateId } = formField;
  return (
    <>
      <Grid item xs={4}>
        <Select
          value={values[mailTemplateId.name]}
          options={mailTemplates}
          optionLabel={(option) => option.label}
          fieldName={mailTemplateId.name}
          inputLabel={mailTemplateId.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={4}>
        <FormField
          value={values[mailTo.name]}
          onChange={(e) => setFieldValue(mailTo.name, e.target.value)}
          name={mailTo.name}
          label={mailTo.label}
          type={mailTo.type}
          success={values[mailTo.name]?.length > 0 && !errors[mailTo.name]}
        />
      </Grid>
    </>
  );
}
