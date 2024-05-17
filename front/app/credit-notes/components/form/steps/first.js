"use client";

import { Autocomplete, Grid } from "@mui/material";
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
  discountTypes,
  tags: tagsData,
  currencies,
  creditNote,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { partner, project, number, date, currency, reference, discountType } =
    formField;
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
        setFieldValue(partner.name, data.defendantId);
        setFieldValue(project.name, data.id);
      });
    }
  }, [searchParams, setFieldValue, project, partner]);

  useEffect(() => {
    if (creditNote) {
      setFieldValue(number.name, String(creditNote.number) ?? "");
      setFieldValue(currency.name, creditNote.currencyId ?? "");
      setFieldValue(reference.name, creditNote.referenceNo ?? "");
      setFieldValue(date.name, creditNote.date ?? "");
      setFieldValue(partner.name, creditNote.partnerId ?? "");
      setFieldValue(project.name, creditNote.projectId ?? "");
    }
  }, [
    creditNote,
    setFieldValue,
    number,
    currency,
    reference,
    date,
    partner,
    project,
  ]);

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
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha desde proforma",
          }}
          format="DD/MM/YYYY"
          value={values[date.name]}
          onChange={(value) =>
            setFieldValue(date.name, moment(value[0]).format("YYYY-MM-DD"))
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
    </Grid>
  );
}
