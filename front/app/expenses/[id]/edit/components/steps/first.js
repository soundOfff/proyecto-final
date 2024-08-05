"use client";

import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { ErrorMessage } from "formik";

import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDDatePicker from "/components/MDDatePicker";
import Select from "/components/Select";

import { getSelect as getProjectSelect } from "/actions/projects";
import { getAll as getTaskSelect } from "/actions/tasks";

export default function First({ expense, formData, partners, categories }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    name,
    note,
    category,
    date,
    amount,
    partner,
    task,
    project,
    billable,
  } = formField;
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setFieldValue(name.name, expense.name ?? "");
    setFieldValue(note.name, expense.note ?? "");
    setFieldValue(category.name, expense.category?.id ?? null);
    setFieldValue(task.name, expense.task?.id ?? null);
    setFieldValue(partner.name, expense.partner?.id ?? null);
    setFieldValue(project.name, expense.project?.id ?? null);
    setFieldValue(amount.name, expense.amount ?? "");
    setFieldValue(
      date.name,
      expense.date ? expense.date : moment().format("YYYY-MM-DD")
    );
    setFieldValue(billable.name, expense.billable);
  }, [
    expense,
    name,
    note,
    category,
    partner,
    task,
    project,
    amount,
    date,
    billable,
    setFieldValue,
  ]);

  useEffect(() => {
    if (values.partner_id) {
      getProjectSelect(values.partner_id).then((projects) =>
        setProjects(projects)
      );
    }
  }, [values.partner_id, setFieldValue, project]);

  useEffect(() => {
    if (values.project_id) {
      getTaskSelect({
        "filter[taskable_id]": values.project_id,
        "filter[taskable_type]": "project",
      }).then(({ data }) => setTasks(data.tasks));
    }
  }, [values.project_id, setFieldValue, task]);

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
          success={values[name.name]?.length > 0 && !errors[name.name]}
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
                title="Para uso personal - Si se puede facturar, se puede agregar a Nombre a la descripción larga de la factura."
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
          success={values[note.name]?.length > 0 && !errors[note.name]}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => `${option.name}`}
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
        {tasks.length > 0 ? (
          <Select
            value={values[task.name]}
            options={tasks}
            optionLabel={(option) => option.name}
            fieldName={task.name}
            inputLabel={task.label}
            setFieldValue={setFieldValue}
          />
        ) : (
          <MDTypography variant="caption" color="warning">
            No hay tareas asociadas a este proyecto
          </MDTypography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[category.name]}
          options={categories}
          optionLabel={(option) => `${option.name}`}
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
          error={errors[amount.name] && touched[amount.name]}
          success={values[amount.name]?.length > 0 && !errors[amount.name]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha de Gastos",
          }}
          value={values[date.name]}
          onChange={(value) =>
            setFieldValue(
              date.name,
              value[0] ? moment(value[0]).format("YYYY-MM-DD") : null
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
      <Grid item xs={12}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[billable.name]}
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
