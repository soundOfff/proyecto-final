"use client";

import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@mui/material";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/detail-form";
import Select from "/components/Select";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { PANAMA_ID } from "/utils/constants/countries";
import { getAll as getAllProvinces } from "/actions/provinces";
import { getAll as getAllDistricts } from "/actions/districts";
import { getAll as getAllJurisdictions } from "/actions/jurisdictions";

export default function JuridicalForm({
  countries,
  consolidators,
  errors,
  values,
  touched,
  setFieldValue,
}) {
  const {
    formField: {
      juridical: {
        company,
        address,
        country,
        state,
        city,
        province,
        district,
        jurisdiction,
        consolidator,
        isConsolidator,
        phone,
        website,
        zip,
      },
    },
  } = form;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);

  useEffect(() => {
    if (values.country_id === PANAMA_ID) {
      getAllProvinces().then((provinces) => {
        setProvinces(provinces);
      });
    } else {
      setFieldValue("province_id", "");
      setFieldValue("district_id", "");
      setFieldValue("jurisdiction_id", "");
    }
  }, [values.country_id, setFieldValue]);

  useEffect(() => {
    if (values.province_id) {
      getAllDistricts({ "filter[province_id]": values.province_id }).then(
        (districts) => {
          setDistricts(districts);
        }
      );
    }
  }, [values.province_id]);

  useEffect(() => {
    if (values.district_id) {
      getAllJurisdictions({ "filter[district_id]": values.district_id }).then(
        (jurisdictions) => {
          setJurisdictions(jurisdictions);
        }
      );
    }
  }, [values.district_id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormField
          label={company.label}
          placeholder={company.placeholder}
          name={company.name}
          type={company.type}
          error={errors.name && touched.name}
          success={company.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={address.label}
          placeholder={address.placeholder}
          name={address.name}
          type={address.type}
          error={errors.name && touched.name}
          success={address.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={city.label}
          placeholder={city.placeholder}
          name={city.name}
          type={city.type}
          error={errors.name && touched.name}
          success={city.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={state.label}
          placeholder={state.placeholder}
          name={state.name}
          type={state.type}
          error={errors.name && touched.name}
          success={state.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          value={
            consolidators.find((c) => c.id == values[consolidator.name]) ?? null
          }
          onChange={(e, consolidatorSelected) =>
            setFieldValue(consolidator.name, consolidatorSelected?.id ?? null)
          }
          options={consolidators}
          getOptionLabel={(option) => option?.company ?? ""}
          isOptionEqualToValue={(option, value) =>
            option.id == value.id || !value
          }
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={consolidator.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ ...params.inputProps }}
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
            <ErrorMessage name={consolidator.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultValue={values.isConsolidator}
                onChange={(e) =>
                  setFieldValue(isConsolidator.name, e.currentTarget.checked)
                }
              />
            }
            label={consolidator.label}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Select
          value={values[country.name]}
          options={countries}
          optionLabel={(option) => option.shortName}
          fieldName={country.name}
          inputLabel={country.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      {values[country.name] === PANAMA_ID ? (
        <>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[province.name]}
              options={provinces}
              optionLabel={(option) => option.name}
              fieldName={province.name}
              inputLabel={province.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[district.name]}
              options={districts}
              optionLabel={(option) => option.name}
              fieldName={district.name}
              inputLabel={district.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[jurisdiction.name]}
              options={jurisdictions}
              optionLabel={(option) => option.name}
              fieldName={jurisdiction.name}
              inputLabel={jurisdiction.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <FormField
              label={state.label}
              placeholder={state.placeholder}
              name={state.name}
              type={state.type}
              error={errors.name && touched.name}
              success={state.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={city.label}
              placeholder={city.placeholder}
              name={city.name}
              type={city.type}
              error={errors.name && touched.name}
              success={city.length > 0 && !errors.name}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={6}>
        <FormField
          label={website.label}
          name={website.name}
          type={website.type}
          error={errors.name && touched.name}
          success={website.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={zip.label}
          name={zip.name}
          type={zip.type}
          error={errors.name && touched.name}
          success={zip.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={phone.label}
          placeholder={phone.placeholder}
          name={phone.name}
          type={phone.type}
          value={values.phoneNumber}
          error={errors.name && touched.name}
          success={phone.length > 0 && !errors.name}
        />
      </Grid>
    </Grid>
  );
}
