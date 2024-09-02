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
import { useEffect } from "react";

export default function First({
  formData,
  discountTypes,
  statuses,
  tags: tagsData,
  currencies,
  proposal,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    subject,
    date,
    openTill,
    currency,
    discountType,
    tags,
    allowComments,
    status,
  } = formField;

  useEffect(() => {
    if (proposal) {
      setFieldValue(status.name, proposal.statusId);
      setFieldValue(subject.name, proposal.subject);
      setFieldValue(date.name, moment(proposal.date).format("YYYY-MM-DD"));
      setFieldValue(
        openTill.name,
        moment(proposal.openTill).format("YYYY-MM-DD")
      );
      setFieldValue(currency.name, proposal.currencyId);
      setFieldValue(discountType.name, proposal.discountType?.id);
      setFieldValue(allowComments.name, proposal.allowComments);
      setFieldValue(tags.name, proposal.tags);
    }
  }, [
    proposal,
    setFieldValue,
    subject,
    date,
    openTill,
    currency,
    discountType,
    allowComments,
    tags,
    status,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[subject.name]}
          name={subject.name}
          label={subject.label}
          type={subject.type}
          placeholder={subject.placeholder}
          error={errors[subject.name] && touched[subject.name]}
          success={values[subject.name]?.length > 0 && !errors[subject.name]}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[status.name]}
          options={statuses}
          optionLabel={(option) => option.label}
          fieldName={status.name}
          inputLabel={status.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: date.label,
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
        <MDDatePicker
          input={{
            fullWidth: true,
            label: openTill.label,
          }}
          format="DD/MM/YYYY"
          value={values[openTill.name]}
          onChange={(value) =>
            setFieldValue(openTill.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={openTill.name} />
          </MDTypography>
        </MDBox>
      </Grid>

      <Grid item xs={12} sm={6}>
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
        <Select
          value={values[discountType.name]}
          options={discountTypes}
          optionLabel={(option) => option.label}
          fieldName={discountType.name}
          inputLabel={discountType.label}
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

      {/*  <Grid item xs={12} sm={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[allowComments.name]}
                onChange={(e) =>
                  setFieldValue(allowComments.name, e.target.checked)
                }
              />
            }
            label={allowComments.label}
          />
        </FormGroup>
      </Grid> */}
    </Grid>
  );
}
