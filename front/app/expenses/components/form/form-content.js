"use client";

import {
  Autocomplete,
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
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import Select from "/components/Select";
import { CUSTOM, RECURRING_TYPES } from "/utils/constants/repeats";
import { ErrorMessage } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSelect as getProjectSelect } from "/actions/projects";
import { getAll as getTaskSelect } from "/actions/tasks";
import { EXPENSE_FILEABLE_TYPE } from "/utils/constants/fileableTypes";
import { getDefaultCurrency } from "/actions/currencies";
import FileForm from "/components/FileForm";

export default function FormContent({
  expense,
  formData,
  formField,
  partners,
  categories,
  currencies,
  taxes,
  paymentMethods,
  repeats,
}) {
  const { values, errors, touched, setFieldValue } = formData;
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

  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partnerId");
  const projectId = searchParams.get("projectId");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (expense) {
      setFieldValue(name.name, expense.name ?? "");
      setFieldValue(note.name, expense.note ?? "");
      setFieldValue(category.name, expense.category?.id ?? "");
      setFieldValue(task.name, expense.task?.id ?? "");
      setFieldValue(partner.name, expense.partner?.id ?? "");
      setFieldValue(project.name, expense.project?.id ?? "");
      setFieldValue(amount.name, expense.amount ?? "");
      setFieldValue(
        date.name,
        expense.date ? expense.date : moment().format("YYYY-MM-DD")
      );
      setFieldValue(billable.name, expense.billable ?? false);
      setFieldValue(currency.name, expense.currency?.id ?? "");
      setFieldValue(tax.name, expense.tax_id ?? "");
      setFieldValue(tax2.name, expense.tax2_id ?? "");
      setFieldValue(paymentMethod.name, expense.paymentMethod?.id ?? "");
      setFieldValue(reference.name, expense.reference ?? "");
      setFieldValue(repeat.name, expense.repeat_id ?? "");
      setFieldValue(recurring.name, expense.recurring ?? "");
      setFieldValue(isInfinite.name, expense.is_infinite ?? true);
      setFieldValue(totalCycles.name, expense.total_cycles ?? "");
      setFieldValue(recurringType.name, Number(expense.recurring_type));
      setFieldValue(
        createInvoiceBillable.name,
        expense.create_invoice_billable
      );
      setFieldValue(
        sendInvoiceToCustomer.name,
        expense.send_invoice_to_customer
      );
    }
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
    setFieldValue,
  ]);

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

  useEffect(() => {
    if (values.project_id) {
      getTaskSelect({
        "filter[taskable_id]": values.project_id,
        "filter[taskable_type]": "project",
      }).then(({ data }) => setTasks(data.tasks));
    }
  }, [values.project_id, setFieldValue, task]);

  useEffect(() => {
    getDefaultCurrency().then((defaultCurrency) => {
      setFieldValue(currency.name, defaultCurrency.id);
    });
  }, [currency.name, setFieldValue]);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
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
          success={values[note.name]?.length > 0 && !errors[note.name]}
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
              value[0] ? moment(value[0]).format("YYYY-MM-DD") : ""
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
        <Select
          value={values[currency.name]}
          options={currencies}
          optionLabel={(option) => `${option.symbol} ${option.name}`}
          fieldName={currency.name}
          inputLabel={currency.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, taxSelected) =>
            setFieldValue(tax.name, taxSelected?.id)
          }
          options={taxes}
          getOptionLabel={(option) => `${option.name} | ${option.rate}%`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography variant="body" display="inline">
                {option.rate}%
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
          getOptionLabel={(option) => `${option.name} | ${option.rate}%`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography variant="body" display="inline">
                {option.rate}%
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
            setFieldValue(paymentMethod.name, method ? method.id : null)
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
          value={values[reference.name]}
          name={reference.name}
          label={reference.label}
          type={reference.type}
          placeholder={reference.placeholder}
          error={errors[reference.name] && touched[reference.name]}
          success={
            values[reference.name]?.length > 0 && !errors[reference.name]
          }
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
              value={values[recurring.name]}
              name={recurring.name}
              type={recurring.type}
              label=""
              placeholder={recurring.placeholder}
              error={errors[recurring.name] && touched[recurring.name]}
              success={
                values[recurring.name]?.length > 0 && !errors[recurring.name]
              }
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
              value={values[totalCycles.name]}
              name={totalCycles.name}
              label={totalCycles.label}
              type={totalCycles.type}
              placeholder={totalCycles.placeholder}
              error={errors[totalCycles.name] && touched[totalCycles.name]}
              success={
                values[totalCycles.name]?.length > 0 &&
                !errors[totalCycles.name]
              }
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
        {showCheckboxes && (
          <MDBox sx={{ display: "flex" }}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values[createInvoiceBillable.name]}
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
                      checked={values[sendInvoiceToCustomer.name]}
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
        )}
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
                    defaultChecked
                  />
                }
                label={billable.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <FileForm
          formData={formData}
          formField={formField}
          fileableType={EXPENSE_FILEABLE_TYPE}
        />
      </Grid>
    </Grid>
  );
}
