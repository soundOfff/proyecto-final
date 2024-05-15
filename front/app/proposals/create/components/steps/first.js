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
import { show as getPartner } from "/actions/partners";
import { useSearchParams } from "next/navigation";

export default function First({
  formData,
  partners,
  discountTypes,
  tags: tagsData,
  currencies,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    subject,
    partner,
    date,
    openTill,
    currency,
    discountType,
    tags,
    allowComments,
    proposalTo,
    country,
    address,
    state,
    city,
    zip,
    email,
    phone,
  } = formField;
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const partnerId = params.get("partnerId");

    if (partnerId) {
      setFieldValue(partner.name, Number(partnerId));
    }
  }, [setFieldValue, partner.name, searchParams]);

  useEffect(() => {
    getPartner(values[partner.name]).then((partner) => {
      setFieldValue(proposalTo.name, partner.company ?? partner.name ?? "");
      setFieldValue(country.name, partner.countryId ?? "");
      setFieldValue(address.name, partner.address ?? "");
      setFieldValue(city.name, partner.city ?? "");
      setFieldValue(state.name, partner.state ?? "");
      setFieldValue(zip.name, partner.zip ?? "");
      setFieldValue(email.name, partner.email ?? "");
      setFieldValue(phone.name, partner.phoneNumber ?? "");
    });
  }, [
    values,
    partner,
    setFieldValue,
    proposalTo,
    country,
    address,
    city,
    state,
    zip,
    email,
    phone,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          name={subject.name}
          label={subject.label}
          type={subject.type}
          placeholder={subject.placeholder}
          error={errors.subject && touched.subject}
          success={subject.length > 0 && !errors.subject}
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

      <Grid item xs={12} sm={6}>
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
      </Grid>
    </Grid>
  );
}
