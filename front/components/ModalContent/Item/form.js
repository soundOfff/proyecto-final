"use client";
import { Grid, Autocomplete } from "@mui/material";

import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { Form, Formik, ErrorMessage } from "formik";

import { store as storeItem } from "/actions/items";

export default function ModalContentForm({
  taxes = [],
  groupIds = [],
  onClose,
}) {
  const { formField, formId } = form;
  const { description, longDescription, rate, tax, tax2, itemGroupId } =
    formField;

  const handleSubmit = async (values) => {
    await storeItem(values);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          <MDBox
            color="white"
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            Nuevo artículo
          </MDBox>
          <MDBox sx={{ p: 5 }}>
            <Grid container lineHeight={0} spacing={2}>
              <Grid item xs={12}>
                <FormField
                  name={description.name}
                  label={description.label}
                  type={description.type}
                  placeholder={description.placeholder}
                  value={values[description.description]}
                  error={errors.description && touched.description}
                  success={description.length > 0 && !errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name={longDescription.name}
                  label={longDescription.label}
                  type={longDescription.type}
                  placeholder={longDescription.placeholder}
                  value={values[longDescription.name]}
                  error={errors.longDescription && touched.longDescription}
                  success={
                    longDescription.length > 0 && !errors.longDescription
                  }
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name={rate.name}
                  label={rate.label}
                  type={rate.type}
                  placeholder={rate.placeholder}
                  value={values[rate.name]}
                  error={errors.rate && touched.rate}
                  success={rate.length > 0 && !errors.rate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  onChange={(e, selectedTax) =>
                    setFieldValue(tax.name, selectedTax?.id)
                  }
                  options={taxes}
                  getOptionLabel={(option) =>
                    `${option.name} | ${option.rate}%`
                  }
                  renderOption={(props, option) => (
                    <MDBox {...props}>
                      <MDTypography variant="body" display="inline">
                        {option.rate}%
                      </MDTypography>
                      <MDTypography
                        variant="caption"
                        display="inline"
                        color="text"
                        ml={2}
                      >
                        {option.name}
                      </MDTypography>
                    </MDBox>
                  )}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      variant="standard"
                      label={tax.label}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <MDBox mt={0.75}>
                  <MDTypography
                    component="div"
                    variant="caption"
                    color="error"
                    fontWeight="regular"
                  >
                    <ErrorMessage name={tax.name} />
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  onChange={(e, tax) => setFieldValue(tax2.name, tax?.id)}
                  options={taxes}
                  getOptionLabel={(option) =>
                    `${option.name} | ${option.rate}%`
                  }
                  renderOption={(props, option) => (
                    <MDBox {...props}>
                      <MDTypography variant="body" display="inline">
                        {option.rate}%
                      </MDTypography>
                      <MDTypography
                        variant="caption"
                        display="inline"
                        color="text"
                        ml={2}
                      >
                        {option.name}
                      </MDTypography>
                    </MDBox>
                  )}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      variant="standard"
                      label={tax2.label}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <MDBox mt={0.75}>
                  <MDTypography
                    component="div"
                    variant="caption"
                    color="error"
                    fontWeight="regular"
                  >
                    <ErrorMessage name={tax2.name} />
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={values[itemGroupId.name]}
                  options={groupIds}
                  optionLabel={(option) => `${option.id} - ${option.name}`}
                  fieldName={itemGroupId.name}
                  inputLabel={itemGroupId.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox p={3}>
            <MDBox
              mt={2}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MDButton variant="gradient" color="light" onClick={handleCancel}>
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
