import {
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDDatePicker from "/components/MDDatePicker";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import moment from "moment";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { CUSTOM, RECURRING_TYPES } from "/utils/constants/repeats";
import { ErrorMessage } from "formik";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { MODAL_TYPES } from "../../../utils/constants/modalTypes";
import { convertToHTML } from "draft-convert";

export default function TaskForm({
  priorities,
  formData,
  repeats,
  taskableTypes,
  tagsData,
  task = null,
  mode,
}) {
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
    isInfinite,
    totalCycles,
    taskableId,
    taskableType,
    tags,
    description,
  } = formField;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [taskableItems, setTaskableItems] = useState([]);

  useEffect(() => {
    setFieldValue(
      "description",
      editorState.getCurrentContent().getPlainText()
    );
  }, [editorState, setFieldValue]);

  useEffect(() => {
    if (task && mode === MODAL_TYPES.EDIT) {
      setFieldValue(name.name, task.name);
      setFieldValue(hourlyRate.name, task.hourly_rate || "0");
      setFieldValue(startDate.name, task.start_date);
      setFieldValue(dueDate.name, task.due_date || "");
      setFieldValue(task_priority_id.name, task.priority.id);
      setFieldValue(repeat.name, task.repeat_id);
      setFieldValue(recurring.name, task.recurring || "");
      setFieldValue(recurringType.name, task.recurring_type || "");
      setFieldValue(isInfinite.name, task.is_infinite || false);
      setFieldValue(totalCycles.name, task.total_cycles || "");
      setFieldValue(taskableType.name, task.taskable_type || 0);
      setFieldValue(tags.name, task.tags || []);
      setFieldValue(taskableId.name, task.taskable.id || "");
      setFieldValue(billable.name, task.billable || false);
      setFieldValue(isPublic.name, task.is_public || false);
      setFieldValue(description.name, task.description || "");
      setTaskableItems([task.taskable]);
    }
  }, [task]);

  const debounce = (func, delay) => {
    let debounceTimeout;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleChange = useCallback((editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const data = JSON.stringify(raw);
    values[description.name] = data;
    setEditorState(editorState);
  }, []);

  const handleSearch = async (value = "") => {
    if (value.length <= 2) return setTaskableItems([]);
    const items = await getAllTaskableTypes({ search: value });
    setTaskableItems(items);
  };

  const debouncedHandleSearch = debounce(handleSearch, 100);

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
        Nueva tarea
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
          <Grid item xs={12} sm={8}>
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
          <Grid item xs={12} sm={4}>
            <FormField
              name={hourlyRate.name}
              label={hourlyRate.label}
              type={hourlyRate.type}
              placeholder={hourlyRate.placeholder}
              value={values[hourlyRate.name]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDDatePicker
              input={{
                placeholder: "Fecha De Inicio",
                variant: "standard",
                fullWidth: true,
              }}
              value={values[startDate.name]}
              onChange={(date) =>
                setFieldValue(
                  startDate.name,
                  moment(date[0]).format("YYYY-MM-DD")
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
                placeholder: "Fecha De Cierre",
                variant: "standard",
                fullWidth: true,
              }}
              value={values[dueDate.name]}
              onChange={(date) =>
                setFieldValue(
                  dueDate.name,
                  moment(date[0]).format("YYYY-MM-DD")
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
              optionLabel="name"
              fieldName={task_priority_id.name}
              inputLabel={task_priority_id.label}
              customOptionLabel="name"
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[repeat.name]}
              options={repeats}
              optionLabel="label"
              fieldName={repeat.name}
              inputLabel={repeat.label}
              setFieldValue={setFieldValue}
            />
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
                <Select
                  value={RECURRING_TYPES.find(
                    (recurring_type) =>
                      recurring_type.id === values[recurringType.name]
                  )}
                  options={RECURRING_TYPES}
                  optionLabel={(option) => option.label}
                  fieldName={recurringType.name}
                  inputLabel={recurringType.label}
                  setFieldValue={setFieldValue}
                />
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
            <Select
              value={values[taskableId.name]}
              options={taskableItems}
              optionLabel="name"
              fieldName={taskableId.name}
              inputLabel={taskableId.label}
              onInputChange={debouncedHandleSearch}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              onChange={(e, selectedTag) =>
                setFieldValue(tags.name, selectedTag)
              }
              value={values[tags.name]}
              options={tagsData}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  key={tags.id}
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
          <Grid item xs={12}>
            <MDTypography variant="body2" color="text">
              {description.label}
            </MDTypography>
            <MDEditor
              editorStyle={{ minHeight: "10vh", padding: "10px 16px" }}
              editorState={editorState}
              setEditorState={handleChange}
            />
            <MDBox mt={0.75}>
              <MDTypography
                component="div"
                variant="caption"
                color="error"
                fontWeight="regular"
              >
                <ErrorMessage name={description.name} />
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}
