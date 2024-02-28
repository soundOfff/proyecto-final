"use client";

import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/form";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import Select from "/components/Select";
import moment from "moment";

export default function PersonForm({
  countries,
  errors,
  values,
  touched,
  setFieldValue,
}) {
  const {
    formField: {
      person: {
        name,
        birthDate,
        expeditionDate,
        expirationDate,
        isMale,
        number,
        country,
      },
    },
  } = form;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          label={name.label}
          placeholder={name.placeholder}
          name={name.name}
          type={name.type}
          error={errors.name && touched.name}
          success={name.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={number.label}
          placeholder={number.placeholder}
          name={number.name}
          type={number.type}
          error={errors.name && touched.name}
          success={number.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Nacimiento",
            InputLabelProps: { shrink: true },
          }}
          format="DD/MM/YYYY"
          value={values[birthDate.name]}
          onChange={(value) =>
            setFieldValue(birthDate.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={birthDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Expedición",
            InputLabelProps: { shrink: true },
          }}
          format="DD/MM/YYYY"
          value={values[expeditionDate.name]}
          onChange={(value) =>
            setFieldValue(
              expeditionDate.name,
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
            <ErrorMessage name={expeditionDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Expiración",
            InputLabelProps: { shrink: true },
          }}
          format="DD/MM/YYYY"
          value={values[expirationDate.name]}
          onChange={(value) =>
            setFieldValue(
              expirationDate.name,
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
            <ErrorMessage name={expirationDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="end">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[isMale.name] || false}
                onChange={(e) =>
                  setFieldValue(isMale.name, e.currentTarget.checked)
                }
              />
            }
            label={isMale.label}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[country.name]}
          options={countries}
          optionLabel="shortName"
          fieldName={country.name}
          inputLabel={country.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}
