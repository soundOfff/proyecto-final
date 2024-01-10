"use client";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { CUSTOM, RECURRING_TYPES } from "/utils/constants/repeats";

export default function Second({
  formData,
  currencies,
  taxes,
  paymentMethods,
  repeats,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    currency,
    tax,
    tax2,
    paymentMethod,
    reference,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    createInvoiceBillable,
    sendInvoiceToCustomer,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Autocomplete
          onChange={(e, currencySelected) =>
            setFieldValue(
              currency.name,
              currencySelected ? currencySelected.id : null
            )
          }
          options={currencies}
          getOptionLabel={(option) => `${option.symbol} ${option.name}`}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={currency.label}
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
            <ErrorMessage name={currency.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, taxSelected) =>
            setFieldValue(tax.name, taxSelected?.id)
          }
          options={taxes}
          getOptionLabel={(option) => `${option.name} | ${option.taxRate}%`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography variant="body" display="inline">
                {option.taxRate}%
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
          getOptionLabel={(option) => `${option.name} | ${option.taxRate}%`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography variant="body" display="inline">
                {option.taxRate}%
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
            setFieldValue(paymentMethod.name, method ? method.id : "")
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
      <Grid item xs={12}>
        <Autocomplete
          onChange={(e, repeatSelected) =>
            setFieldValue(repeat.name, repeatSelected?.id)
          }
          options={repeats}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={repeat.label}
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
            <ErrorMessage name={repeat.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      {values[repeat.name] === CUSTOM && (
        <>
          <Grid item xs={12} sm={6}>
            <FormField
              name={recurring.name}
              type={recurring.type}
              label=""
              placeholder={recurring.placeholder}
              error={errors.recurring && touched.recurring}
              success={recurring.length > 0 && !errors.recurring}
              box={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={RECURRING_TYPES.find(
                (recurring_type) =>
                  recurring_type.id === values[recurringType.name]
              )}
              onChange={(e, recurringTypeSelected) =>
                setFieldValue(recurringType.name, recurringTypeSelected.id)
              }
              options={RECURRING_TYPES}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
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
                <ErrorMessage name={recurring.name} />
              </MDTypography>
            </MDBox>
          </Grid>
        </>
      )}
      {values[repeat.name] && (
        <Grid item xs={12}>
          <MDBox display="flex" alignItems="center">
            <FormField
              name={totalCycles.name}
              label={totalCycles.label}
              type={totalCycles.type}
              placeholder={totalCycles.placeholder}
              error={errors.totalCycles && touched.totalCycles}
              success={totalCycles.length > 0 && !errors.totalCycles}
              box={{ width: "80%" }}
              disabled={values[isInfinite.name]}
            />
            <MDBox ml={5}>
              <FormControlLabel
                control={<Checkbox />}
                checked={values[isInfinite.name]}
                onChange={(e) => {
                  setFieldValue(isInfinite.name, Boolean(e.target.checked));
                  setFieldValue(totalCycles.name, "");
                }}
                label="Infinito"
                labelPlacement="end"
                sx={{ display: "flex", flexWrap: "nowrap" }}
              />
            </MDBox>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFieldValue(
                        createInvoiceBillable.name,
                        e.target.checked
                      )
                    }
                    name={createInvoiceBillable.name}
                  />
                }
                label={createInvoiceBillable.label}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFieldValue(
                        sendInvoiceToCustomer.name,
                        e.target.checked
                      )
                    }
                    name={sendInvoiceToCustomer.name}
                  />
                }
                label={sendInvoiceToCustomer.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
    </Grid>
  );
}
