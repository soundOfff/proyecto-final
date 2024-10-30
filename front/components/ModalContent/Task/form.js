import {
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import moment from "moment";
import { ErrorMessage } from "formik";
import { getSelect as getProjectSelect } from "/actions/projects";
import { getSelect as getInvoiceSelect } from "/actions/invoices";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { getAll as getAllDependencies } from "/actions/tasks";
import { show as getProject } from "/actions/projects";
import { getSelect as selectPartners } from "/actions/partners";
import { getAll as getAllPriorities } from "/actions/task-priorities";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { MODAL_TYPES } from "/utils/constants/modalTypes";

export default function TaskForm({
  formData,
  partnerId,
  mode,
  project = null,
  task = null,
}) {
  const [staffs, setStaffs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskableItems, setTaskableItems] = useState([]);
  const [dependencyTasks, setDependencyTasks] = useState([]);

  const { values, errors, touched, setFieldValue, formField } = formData;
  const {
    isPublic,
    billable,
    name,
    hourlyRate,
    startDate,
    dueDate,
    task_priority_id,
    repeat,
    recurring,
    recurringType,
    dependencies,
    isInfinite,
    initialDurationMinutes,
    totalCycles,
    taskableId,
    partner_id,
    assigneds,
    taskableType,
    description,
    actions,
    requiredFields,
    isFileNeeded,
  } = formField;

  useEffect(() => {
    selectPartners().then((partners) => setPartners(partners));
    getAllPriorities().then((priorities) => setPriorities(priorities));
    getAllTaskableTypes().then((res) => setTaskableItems(res.data.projects));
  }, []);

  useEffect(() => {
    if (task) {
      setFieldValue(name.name, task.name ?? "");
      setFieldValue(hourlyRate.name, task.hourly_rate ?? "0");
      setFieldValue(startDate.name, task.start_date ?? "");
      setFieldValue(dueDate.name, task.due_date ?? "");
      setFieldValue(task_priority_id.name, task.priority?.id ?? "");
      setFieldValue(recurring.name, task.recurring || "");
      setFieldValue(recurringType.name, task.recurring_type || "");
      setFieldValue(assigneds.name, task.assigneds || []);
      setFieldValue(totalCycles.name, task.total_cycles || "");
      setFieldValue(taskableType.name, task.taskable_type || 0);
      setFieldValue(dependencies.name, task.dependencies || []);
      setFieldValue(partner_id.name, task.partner_id || "");
      setFieldValue(
        taskableId.name,
        task.taskable?.id || task.taskable_id || ""
      );
      setFieldValue(billable.name, Boolean(task.billable));
      setFieldValue(isPublic.name, Boolean(task.is_public));
      setFieldValue(isInfinite.name, Boolean(task.is_infinite));
      setTaskableItems(task.taskable ? [task.taskable] : []);
      setFieldValue(description.name, task.description || "");
      setFieldValue(actions.name, task.actions || []);
      setFieldValue(requiredFields.name, task.requiredFields || []);
      setFieldValue(isFileNeeded.name, Boolean(task.is_file_needed));
    }
    if (partnerId) {
      setFieldValue(partner_id.name, partnerId || "");
    }
    if (project) {
      setFieldValue(taskableId.name, project.id);
      setFieldValue(partner_id.name, project.billablePartnerId);
    }
  }, [
    task,
    mode,
    project,
    partnerId,
    setFieldValue,
    description.name,
    taskableId.name,
    initialDurationMinutes.name,
    taskableType.name,
    recurring.name,
    recurringType.name,
    repeat.name,
    startDate.name,
    dueDate.name,
    task_priority_id.name,
    hourlyRate.name,
    name.name,
    billable.name,
    isPublic.name,
    isInfinite.name,
    totalCycles.name,
    partner_id.name,
    actions.name,
    dependencies.name,
    requiredFields.name,
    isFileNeeded.name,
    assigneds.name,
  ]);

  useEffect(() => {
    if (values[partner_id.name]) {
      const items =
        values[taskableType.name] === INVOICE_TYPE
          ? getInvoiceSelect({ "filter[partner_id]": values[partner_id.name] })
          : getProjectSelect(values[partner_id.name]);

      items.then((data) => {
        setTaskableItems(data);
      });
    }
  }, [partner_id, taskableType, values]);

  useEffect(() => {
    if (values.taskable_type === PROJECT_TYPE && values.taskable_id) {
      getAllDependencies({
        "filter[taskable_id]": values.taskable_id,
        "filter[taskable_type]": values.taskable_type,
      }).then(({ data }) => {
        setDependencyTasks(data.tasks);
      });
      getProject(values.taskable_id, { include: "members" }).then((project) => {
        setStaffs(project.members);
      });
    }
  }, [
    values.taskable_id,
    values.taskable_type,
    assigneds,
    setFieldValue,
    taskableId,
    taskableType,
  ]);

  return (
    <>
      <MDBox
        color="white"
        bgColor="dark"
        variant="gradient"
        borderRadius="lg"
        shadow="lg"
        overflow="auto"
        opacity={1}
        p={2}
      >
        {mode === MODAL_TYPES.CREATE ? "Nueva tarea" : "Editar tarea"}
      </MDBox>
      <MDBox sx={{ px: 2, pt: 3 }}>
        <Grid container lineHeight={0} spacing={2}>
          <Grid item xs={12}>
            <MDBox
              sx={{
                width: "100%",
              }}
            >
              <FormControl
                component="fieldset"
                variant="standard"
                sx={{ width: "100%" }}
              >
                <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values[isPublic.name]}
                        onChange={(e) =>
                          setFieldValue(isPublic.name, e.target.checked)
                        }
                        name={isPublic.name}
                      />
                    }
                    label={isPublic.label}
                  />
                </FormGroup>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={task ? 8 : 12}>
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
          <Grid item xs={12} sm={task ? 4 : 6}>
            <FormField
              name={hourlyRate.name}
              label={hourlyRate.label}
              type={hourlyRate.type}
              placeholder={hourlyRate.placeholder}
              value={values[hourlyRate.name]}
            />
          </Grid>
          {!task && (
            <Grid item xs={12} sm={6}>
              <FormField
                name={initialDurationMinutes.name}
                label={initialDurationMinutes.label}
                type={initialDurationMinutes.type}
                placeholder={initialDurationMinutes.placeholder}
                value={values[initialDurationMinutes.name]}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <MDDatePicker
              input={{
                label: "Fecha De Inicio",
                fullWidth: true,
              }}
              value={values[startDate.name]}
              onChange={(date) =>
                setFieldValue(
                  startDate.name,
                  date[0] ? moment(date[0]).format("YYYY-MM-DD") : ""
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
                <ErrorMessage name={startDate.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDDatePicker
              input={{
                label: "Fecha De Cierre",
                fullWidth: true,
              }}
              options={{ minDate: values[startDate.name], allowInput: true }}
              value={values[dueDate.name]}
              onChange={(date) =>
                setFieldValue(
                  dueDate.name,
                  date[0] ? moment(date[0]).format("YYYY-MM-DD") : ""
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
                <ErrorMessage name={dueDate.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[task_priority_id.name]}
              options={priorities}
              optionLabel={(option) => option.name}
              fieldName={task_priority_id.name}
              inputLabel={task_priority_id.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[partner_id.name]}
              options={partners}
              optionLabel={(option) => option.mergedName}
              fieldName={partner_id.name}
              inputLabel={partner_id.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              value={values[taskableId.name]}
              options={taskableItems}
              optionLabel={(option) => option.name ?? `#${option.id}`}
              fieldName={taskableId.name}
              inputLabel={
                values[taskableType.name] === INVOICE_TYPE ? "Factura" : "Caso"
              }
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              onChange={(e, selected) =>
                setFieldValue(assigneds.name, selected)
              }
              value={values[assigneds.name]}
              options={staffs}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  key={assigneds.id}
                  label={assigneds.label}
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
                <ErrorMessage name={assigneds.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              onChange={(e, selectedTask) =>
                setFieldValue(dependencies.name, selectedTask)
              }
              value={values[dependencies.name]}
              options={dependencyTasks}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  key={dependencies.id}
                  label={dependencies.label}
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
                <ErrorMessage name={dependencies.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <FormField
              name={description.name}
              label={description.label}
              placeholder={description.placeholder}
              value={values[description.name]}
              error={errors.description && touched.description}
              success={description.length > 0 && !errors.description}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={values[isFileNeeded.name]}
                    onChange={(e) =>
                      setFieldValue(isFileNeeded.name, e.target.checked)
                    }
                  />
                }
                label={isFileNeeded.label}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}
