"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Tooltip,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import Select from "/components/Select";
import { ErrorMessage } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSelect as getProjectSelect } from "/actions/projects";

export default function First({ formData, partners, categories }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { name, note, category, date, amount, partner, project, billable } =
    formField;
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partnerId");
  const projectId = searchParams.get("projectId");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (partnerId) {
      setFieldValue(partner.name, Number(partnerId));
    }
  }, [partnerId, setFieldValue, partner]);

  useEffect(() => {
    if (projectId) {
      setFieldValue(project.name, Number(projectId));
    }
  }, [projectId, setFieldValue, project]);

  useEffect(() => {
    if (values.partner_id) {
      getProjectSelect(values.partner_id).then((projects) =>
        setProjects(projects)
      );
    }
  }, [values.partner_id, setFieldValue, project]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          value={values[name.name]}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name].length > 0 && !errors[name.name]}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={note.name}
          label={
            <MDBox lineHeight={0}>
              {note.label}
              <Tooltip
                sx={{ marginLeft: "15px" }}
                title="Para uso personal como recordatorio o para el equipo de soporte"
                placement="right-end"
              >
                <MDButton
                  variant="outlined"
                  color="secondary"
                  size="xs"
                  iconOnly
                  circular
                >
                  <Icon sx={{ cursor: "pointer" }}>priority_high</Icon>
                </MDButton>
              </Tooltip>
            </MDBox>
          }
          type={note.type}
          placeholder={note.placeholder}
          value={values[note.name]}
          error={errors[note.name] && touched[note.name]}
          success={values[note.name].length > 0 && !errors[note.name]}
          multiline
          rows={4}
        />
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
          <MDTypography variant="caption" color="warning">
            No hay proyectos asociados a este cliente
          </MDTypography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[category.name]}
          options={categories}
          optionLabel={(option) => option.name}
          fieldName={category.name}
          inputLabel={category.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={amount.name}
          label={amount.label}
          type={amount.type}
          placeholder={amount.placeholder}
          value={values[amount.name]}
          error={errors[amount.name]}
          success={values[amount.name].length > 0 && !errors[amount.name]}
        />
      </Grid>
      <Grid item xs={12}>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha de Gastos",
          }}
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
      <Grid item xs={12}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFieldValue(billable.name, e.target.checked)
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
  );
}
