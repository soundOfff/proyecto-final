"use client";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Switch,
  Select as MuiSelect,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/form";
import Select from "/components/Select";
import { PANAMA_ID } from "/utils/constants/countries";
import { useEffect, useState } from "react";
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
        state,
        city,
        consolidator,
        isConsolidator,
        country,
        district,
        jurisdiction,
        province,
        website,
        zip,
        email,
        address,
        isResidential,
        phone,
        buildingNumber,
        fileNumber,
        imageNumber,
        rollNumber,
        ruc,
        president,
        secretary,
        treasurer,
        dv,
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
        <Select
          value={values[consolidator.name]}
          options={consolidators}
          optionLabel={(option) => option.company ?? ""}
          fieldName={consolidator.name}
          inputLabel={consolidator.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

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
      <Grid item xs={12} sm={6}>
        <FormField
          label={email.label}
          placeholder={email.placeholder}
          name={email.name}
          type={email.type}
          value={values[email.name]}
          error={errors.name && touched.name}
          success={email.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={buildingNumber.label}
          placeholder={buildingNumber.placeholder}
          name={buildingNumber.name}
          type={buildingNumber.type}
          value={values[buildingNumber.name]}
          error={errors.name && touched.name}
          success={buildingNumber.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="standard" fullWidth sx={{ mt: -2.3 }}>
          <InputLabel>{isResidential.label}</InputLabel>
          <MuiSelect
            value={values[isResidential.name]}
            label={isResidential.label}
            onChange={(e) => setFieldValue(isResidential.name, e.target.value)}
            sx={{ height: "3rem" }}
          >
            <MenuItem value={true}>Residencial</MenuItem>
            <MenuItem value={false}>Edificio</MenuItem>
          </MuiSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={fileNumber.label}
          placeholder={fileNumber.placeholder}
          name={fileNumber.name}
          type={fileNumber.type}
          value={values[fileNumber.name]}
          error={errors.name && touched.name}
          success={fileNumber.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={rollNumber.label}
          placeholder={rollNumber.placeholder}
          name={rollNumber.name}
          type={rollNumber.type}
          value={values[rollNumber.name]}
          error={errors.name && touched.name}
          success={rollNumber.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={imageNumber.label}
          placeholder={imageNumber.placeholder}
          name={imageNumber.name}
          type={imageNumber.type}
          value={values[imageNumber.name]}
          error={errors.name && touched.name}
          success={imageNumber.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={ruc.label}
          placeholder={ruc.placeholder}
          name={ruc.name}
          type={ruc.type}
          value={values[ruc.name]}
          error={errors.name && touched.name}
          success={ruc.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={dv.label}
          placeholder={dv.placeholder}
          name={dv.name}
          type={dv.type}
          value={values[dv.name]}
          error={errors.name && touched.name}
          success={dv.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[president.name]}
          options={consolidators}
          optionLabel={(option) =>
            option.company ? option.company : option.name
          }
          fieldName={president.name}
          inputLabel={president.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[secretary.name]}
          options={consolidators}
          optionLabel={(option) =>
            option.company ? option.company : option.name
          }
          fieldName={secretary.name}
          inputLabel={secretary.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[treasurer.name]}
          options={consolidators}
          optionLabel={(option) =>
            option.company ? option.company : option.name
          }
          fieldName={treasurer.name}
          inputLabel={treasurer.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="center">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[isConsolidator.name]}
                onChange={(e) =>
                  setFieldValue(isConsolidator.name, e.currentTarget.checked)
                }
              />
            }
            label={consolidator.label}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
