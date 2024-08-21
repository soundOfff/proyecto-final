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
import {
  getSelect as getProjectSelect,
  show as showProject,
} from "/actions/projects";
import { useSearchParams } from "next/navigation";

export default function First({
  formData,
  partners,
  serviceTypes,
  subServiceTypes,
  tags: tagsData,
  currencies,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    partner,
    project,
    number,
    dateFrom,
    dateTo,
    serviceType,
    hasRetainingAgent,
    subServiceType,
    tags,
    currency,
  } = formField;
  const [projects, setProjects] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (values.partner_id) {
      getProjectSelect(values.partner_id).then((projects) =>
        setProjects(projects)
      );
    }
  }, [values.partner_id]);

  useEffect(() => {
    if (searchParams.get("projectId")) {
      showProject(searchParams.get("projectId")).then((data) => {
        setFieldValue(partner.name, data.billablePartnerId);
        setFieldValue(project.name, data.id);
      });
    }

    if (searchParams.get("partnerId")) {
      setFieldValue(partner.name, Number(searchParams.get("partnerId")));
    }
  }, [searchParams, setFieldValue, project, partner]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
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
        <Autocomplete
          value={currencies.find((c) => c.id === values[currency.name])}
          onChange={(e, currencySelected) =>
            setFieldValue(
              currency.name,
              currencySelected ? currencySelected.id : null
            )
          }
          options={currencies}
          getOptionLabel={(option) =>
            option ? `${option.symbol} ${option.name}` : ""
          }
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
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha desde proforma",
          }}
          format="DD/MM/YYYY"
          value={values[dateFrom.name]}
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
            fullWidth: true,
            label: "Fecha de caducidad",
          }}
          format="DD/MM/YYYY"
          value={values[dateTo.name]}
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
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => option.name}
          fieldName={partner.name}
          inputLabel={partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {projects.length > 0 ? (
          <Select
            value={values[project.name]}
            options={projects}
            optionLabel={(option) => option.name}
            fieldName={project.name}
            inputLabel={project.label}
            setFieldValue={setFieldValue}
          />
        ) : (
          <MDTypography variant="caption" color="error">
            No hay proyectos asociados a este cliente
          </MDTypography>
        )}
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[serviceType.name]}
          options={serviceTypes}
          optionLabel={(option) => option.label}
          fieldName={serviceType.name}
          inputLabel={serviceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          multiple
          value={values[tags.name]}
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
          value={values[subServiceType.name]}
          options={subServiceTypes}
          inputLabel={subServiceType.label}
          optionLabel={(option) => option.label}
          fieldName={subServiceType.name}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[hasRetainingAgent.name]}
                onChange={(e) =>
                  setFieldValue(hasRetainingAgent.name, e.target.checked)
                }
              />
            }
            label={hasRetainingAgent.label}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
