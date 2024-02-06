"use client";
import { Grid, Autocomplete } from "@mui/material";

import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDEditor from "/components/MDEditor";
import MDDatePicker from "/components/MDDatePicker";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import { Form, Formik, ErrorMessage } from "formik";
import { CUSTOM, RECURRING_TYPES } from "/utils/constants/repeats";

export default function ModalContentForm({
  onClose,
  priorities = [],
  repeats = [],
  taskableTypes = [],
  taskeableItems = [],
  tagsData = [],
}) {
  const { formField, formId } = form;
  const {
    isPublic,
    billable,
    name,
    hourlyRate,
    startDate,
    dueDate,
    priority,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    taskableType,
    taskableId,
    tags,
    description,
  } = formField;

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    // await storeItem(values); TODO: make the store
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          <MDBox
            color="white"
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            Nueva tarea
          </MDBox>
          <MDBox sx={{ px: 2, py: 3 }}>
            <Grid container lineHeight={0} spacing={2}>
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
                  name={hourlyRate.name}
                  label={hourlyRate.label}
                  type={hourlyRate.type}
                  placeholder={hourlyRate.placeholder}
                  value={values[hourlyRate.name]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDDatePicker
                  name={startDate.name}
                  label={startDate.label}
                  type={startDate.type}
                  placeholder={startDate.placeholder}
                  value={values[startDate.name]}
                  error={errors.startDate && touched.startDate}
                  success={startDate.length > 0 && !errors.startDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDDatePicker
                  name={dueDate.name}
                  label={dueDate.label}
                  type={dueDate.type}
                  placeholder={dueDate.placeholder}
                  value={values[dueDate.name]}
                  error={errors.dueDate && touched.dueDate}
                  success={dueDate.length > 0 && !errors.dueDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[priority.name]}
                  options={priorities}
                  optionLabel={(option) => option.label}
                  fieldName={priority.name}
                  inputLabel={priority.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[repeat.name]}
                  options={repeats}
                  optionLabel={(option) => option.label}
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
                          setFieldValue(
                            isInfinite.name,
                            Boolean(e.target.checked)
                          );
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
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[taskableType.name]}
                  options={taskableTypes}
                  optionLabel={(option) => option.label}
                  fieldName={taskableType.name}
                  inputLabel={taskableType.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[taskableId.name]}
                  options={taskeableItems}
                  optionLabel={(option) => option.label}
                  fieldName={taskableId.name}
                  inputLabel={taskableId.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  onChange={(e, tagsData) =>
                    setFieldValue(
                      tags.name,
                      tagsData.map((tag) => tag.id)
                    )
                  }
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
              <Grid item xs={12}>
                <MDBox mb={1} ml={0.5} lineHeight={0} display="flex">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                  >
                    Description&nbsp;&nbsp;
                    <MDTypography variant="caption" color="text">
                      (optional)
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDEditor />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox p={3}>
            <MDBox
              mt={2}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MDButton variant="gradient" color="light" onClick={handleCancel}>
                Cancelar
              </MDButton>
              <MDButton
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, values, errors)}
                type="submit"
                variant="gradient"
                color="dark"
              >
                Guardar
              </MDButton>
            </MDBox>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
}
