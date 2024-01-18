"use client";

import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import { ErrorMessage } from "formik";
import Select from "/components/Select";
import { useEffect, useState } from "react";
import { getSelect as getProjectSelect } from "/actions/projects";

export default function First({
  formData,
  partners,
  serviceTypes,
  subServiceTypes,
  tagsData,
  currencies,
  states,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    partner,
    project,
    number,
    dateFrom,
    dateTo,
    serviceType,
    retainingAgent,
    subServiceType,
    tags,
    currency,
    state,
  } = formField;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (values.partner_id) {
      getProjectSelect(values.partner_id).then((projects) =>
        setProjects(projects)
      );
    }
  }, [values.partner_id]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormField
          name={number.name}
          label={number.label}
          type={number.type}
          placeholder={number.placeholder}
          error={errors.number && touched.number}
          success={number.length > 0 && !errors.number}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          options={partners}
          optionLabel="company"
          fieldName={partner.name}
          inputLabel={partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {projects.length > 0 && (
          <Select
            options={projects}
            optionLabel="name"
            fieldName={project.name}
            inputLabel={project.label}
            setFieldValue={setFieldValue}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha desde proforma",
            InputLabelProps: { shrink: true },
          }}
          onChange={(value) =>
            setFieldValue(dateFrom.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={dateFrom.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de caducidad",
            InputLabelProps: { shrink: true },
          }}
          onChange={(value) =>
            setFieldValue(dateTo.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={dateTo.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          options={serviceTypes}
          optionLabel="label"
          fieldName={serviceType.name}
          inputLabel={serviceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          multiple
          onChange={(e, tagsSelected) => setFieldValue(tags.name, tagsSelected)}
          options={tagsData}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={tags.label}
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
            <ErrorMessage name={tags.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          options={subServiceTypes}
          inputLabel={subServiceType.label}
          optionLabel="label"
          fieldName={subServiceType.name}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) =>
                  setFieldValue(retainingAgent.name, e.target.checked)
                }
              />
            }
            label={retainingAgent.label}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
