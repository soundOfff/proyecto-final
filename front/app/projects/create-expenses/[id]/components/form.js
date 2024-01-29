"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";

import {
  Grid,
  Card,
  Autocomplete,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import form from "./schemas/form";
import { store as storeExpense } from "/actions/expenses";
import moment from "moment";

export default function FormComponent({
  projectSelected,
  partners,
  categories,
  taxes,
  paymentMethods,
}) {
  const { formId, formField } = form;
  const {
    name,
    note,
    category,
    date,
    amount,
    partner,
    billable,
    tax,
    tax2,
    paymentMethod,
    reference,
    project,
  } = formField;

  initialValues[project.name] = projectSelected.id;
  initialValues[partner.name] = projectSelected.defendant?.id ?? "";

  const submitForm = async (values, actions) => {
    await storeExpense(values);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <MDBox py={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", mt: 8 }}
      >
        <Grid item xs={12} lg={10}>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form id={formId} autoComplete="off">
                <Card sx={{ height: "100%" }}>
                  <MDBox p={3}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <MDTypography
                          variant="h4"
                          fontWeight="bold"
                          textAlign="center"
                        >
                          Agregar Gasto
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormField
                          name={name.name}
                          label={name.label}
                          type={name.type}
                          placeholder={name.placeholder}
                          value={values[name.name]}
                          error={errors.name && touched.name}
                          success={name.length > 0 && !errors.name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField
                          name={note.name}
                          label={note.label}
                          type={note.type}
                          placeholder={note.placeholder}
                          value={values[note.name]}
                          error={errors.note && touched.note}
                          success={note.length > 0 && !errors.note}
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MDDatePicker
                          input={{
                            variant: "standard",
                            fullWidth: true,
                            placeholder: "Fecha de Gastos",
                            InputLabelProps: { shrink: true },
                            mt: 5,
                          }}
                          onChange={(value) =>
                            setFieldValue(
                              date.name,
                              moment(value[0]).format("YYYY-MM-DD")
                            )
                          }
                        />
                        <MDBox mt={0.75}>
                          <MDTypography
                            component="div"
                            variant="caption"
                            color="error"
                            fontWeight="regular"
                          >
                            <ErrorMessage name={date.name} />
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          onChange={(e, categorySelected) =>
                            setFieldValue(category.name, categorySelected?.id)
                          }
                          options={categories}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              variant="standard"
                              label={category.label}
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
                            <ErrorMessage name={category.name} />
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          value={partners.find(
                            (p) => p.id === values[partner.name]
                          )}
                          onChange={(e, partnerSelected) =>
                            setFieldValue(partner.name, partnerSelected?.id)
                          }
                          options={partners}
                          getOptionLabel={(option) => option.company}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              variant="standard"
                              label={partner.label}
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
                            <ErrorMessage name={partner.name} />
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          name={amount.name}
                          label={amount.label}
                          type={amount.type}
                          placeholder={amount.placeholder}
                          value={values[amount.name]}
                          error={errors.amount && touched.amount}
                          success={amount.length > 0 && !errors.amount}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          onChange={(e, taxSelected) =>
                            setFieldValue(tax.name, taxSelected?.id)
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
                          onChange={(e, tax) =>
                            setFieldValue(tax2.name, tax?.id)
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
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          onChange={(e, method) =>
                            setFieldValue(
                              paymentMethod.name,
                              method ? method.id : ""
                            )
                          }
                          options={paymentMethods}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              variant="standard"
                              label={paymentMethod.label}
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
                            <ErrorMessage name={paymentMethod.name} />
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          name={reference.name}
                          label={reference.label}
                          type={reference.type}
                          placeholder={reference.placeholder}
                          error={errors.reference && touched.reference}
                          success={reference.length > 0 && !errors.reference}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDBox sx={{ display: "flex" }}>
                          <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) =>
                                      setFieldValue(
                                        billable.name,
                                        e.target.checked
                                      )
                                    }
                                    name={billable.name}
                                  />
                                }
                                label={billable.label}
                              />
                            </FormGroup>
                          </FormControl>
                        </MDBox>
                      </Grid>
                    </Grid>
                    <MDBox>
                      <MDBox
                        mt={2}
                        width="100%"
                        display="flex"
                        justifyContent="end"
                      >
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
                  </MDBox>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}
